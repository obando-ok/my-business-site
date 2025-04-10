"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ChartData {
  date?: string;
  name?: string;
  value: number;
}

interface LineChartProps {
  data: ChartData[];
}

export function LineChart({ data }: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const container = d3.select(svgRef.current.parentNode as HTMLElement);
    
    // Get the container dimensions
    const containerWidth = (container.node() as HTMLElement).getBoundingClientRect().width;
    const containerHeight = (container.node() as HTMLElement).getBoundingClientRect().height;
    
    const margin = { top: 30, right: 30, bottom: 60, left: 60 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    // Clear previous chart
    svg.selectAll("*").remove();

    // Set the SVG dimensions
    svg.attr("width", containerWidth)
       .attr("height", containerHeight);
    
    // Create a group with margin
    const g = svg.append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Add drop shadow filter
    const defs = svg.append("defs");
    const filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "130%");
    
    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 3)
        .attr("result", "blur");
    
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 0)
        .attr("dy", 3)
        .attr("result", "offsetBlur");
    
    const feComponentTransfer = filter.append("feComponentTransfer");
    feComponentTransfer.append("feFuncA")
        .attr("type", "linear")
        .attr("slope", 0.2);
    
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur");
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    // X scale
    const x = d3.scaleTime()
      .domain(d3.extent(data, (d: ChartData) => new Date(d.date || "")) as [Date, Date])
      .range([0, width]);

    // Y scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d: ChartData) => d.value) as number * 1.2])
      .nice()
      .range([height, 0]);

    // Add background grid
    g.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x)
        .tickSize(-height)
        .tickFormat(() => "")
      )
      .selectAll("line")
      .attr("stroke", "#e5e7eb")
      .attr("stroke-opacity", 0.3);
      
    g.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(() => "")
      )
      .selectAll("line")
      .attr("stroke", "#e5e7eb")
      .attr("stroke-opacity", 0.3);

    // Add X axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5))
      .attr("color", "#6b7280")
      .selectAll("text")
      .attr("transform", "translate(-10,5)rotate(-45)")
      .style("text-anchor", "end")
      .attr("font-size", "12px");

    // Add Y axis
    g.append("g")
      .call(d3.axisLeft(y))
      .attr("color", "#6b7280")
      .selectAll("text")
      .attr("font-size", "12px");

    // Create gradient
    const gradient = defs.append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", y(0))
      .attr("x2", 0)
      .attr("y2", y(d3.max(data, (d: ChartData) => d.value) as number));
        
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#f59e0b");
        
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#b45309");

    // Create area
    const area = d3.area<ChartData>()
      .x((d: ChartData) => x(new Date(d.date || "")))
      .y0(height)
      .y1((d: ChartData) => y(d.value))
      .curve(d3.curveCatmullRom.alpha(0.5));

    // Add the area
    g.append("path")
      .datum(data)
      .attr("fill", "url(#line-gradient)")
      .attr("fill-opacity", 0.2)
      .attr("d", area);
      
    // Add the line with animation
    const path = g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient)")
      .attr("stroke-width", 3)
      .attr("filter", "url(#drop-shadow)")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", d3.line<ChartData>()
        .x((d: ChartData) => x(new Date(d.date || "")))
        .y((d: ChartData) => y(d.value))
        .curve(d3.curveCatmullRom.alpha(0.5))
      );
      
    // Animate the path
    const pathLength = path.node()?.getTotalLength() || 0;
    path
      .attr("stroke-dasharray", pathLength + " " + pathLength)
      .attr("stroke-dashoffset", pathLength)
      .transition()
      .duration(1500)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

    // Add dots with animation
    g.selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d: ChartData) => x(new Date(d.date || "")))
      .attr("cy", (d: ChartData) => y(d.value))
      .attr("r", 0)
      .style("fill", "#f59e0b")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .transition()
      .delay((d, i) => i * 150)
      .duration(500)
      .attr("r", 6);
      
    // Add tooltips
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("padding", "8px")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("font-size", "12px")
      .style("opacity", 0);
      
    g.selectAll("circle")
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 8);
          
        tooltip.transition()
          .duration(200)
          .style("opacity", 1);
          
        tooltip.html(`Date: ${d.date}<br/>Value: ${d.value}`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 6);
          
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

    // Add window resize listener
    const handleResize = () => {
      tooltip.remove();
      svg.selectAll("*").remove();
      LineChart({ data });
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      tooltip.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, [data]);

  return <svg ref={svgRef} className="w-full h-full" />;
}

interface BarChartProps {
  data: ChartData[];
}

export function BarChart({ data }: BarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const container = d3.select(svgRef.current.parentNode as HTMLElement);
    
    // Get the container dimensions
    const containerWidth = (container.node() as HTMLElement).getBoundingClientRect().width;
    const containerHeight = (container.node() as HTMLElement).getBoundingClientRect().height;
    
    const margin = { top: 30, right: 30, bottom: 80, left: 60 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    // Clear previous chart
    svg.selectAll("*").remove();

    // Set the SVG dimensions
    svg.attr("width", containerWidth)
       .attr("height", containerHeight);
    
    // Create a group with margin
    const g = svg.append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Add drop shadow filter
    const defs = svg.append("defs");
    const filter = defs.append("filter")
        .attr("id", "drop-shadow-bar")
        .attr("height", "130%");
    
    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 3)
        .attr("result", "blur");
    
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 0)
        .attr("dy", 3)
        .attr("result", "offsetBlur");
    
    const feComponentTransfer = filter.append("feComponentTransfer");
    feComponentTransfer.append("feFuncA")
        .attr("type", "linear")
        .attr("slope", 0.2);
    
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur");
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    // X scale
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map((d: ChartData) => d.name || ""))
      .padding(0.3);

    // Y scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d: ChartData) => d.value) as number * 1.2])
      .nice()
      .range([height, 0]);
      
    // Add background grid
    g.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(() => "")
      )
      .selectAll("line")
      .attr("stroke", "#e5e7eb")
      .attr("stroke-opacity", 0.3);

    // Add X axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .attr("color", "#6b7280")
      .selectAll("text")
      .attr("transform", "translate(-10,5)rotate(-45)")
      .style("text-anchor", "end")
      .attr("font-size", "12px");

    // Add Y axis
    g.append("g")
      .call(d3.axisLeft(y))
      .attr("color", "#6b7280")
      .selectAll("text")
      .attr("font-size", "12px");

    // Create gradient
    const gradient = defs.append("linearGradient")
      .attr("id", "bar-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
        
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#f59e0b");
        
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#d97706");

    // Add bars with animation
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d: ChartData) => x(d.name || "") || 0)
      .attr("width", x.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("fill", "url(#bar-gradient)")
      .attr("filter", "url(#drop-shadow-bar)")
      .transition()
      .duration(800)
      .delay((d, i) => i * 100)
      .attr("y", (d: ChartData) => y(d.value))
      .attr("height", (d: ChartData) => height - y(d.value));
      
    // Add tooltips
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("padding", "8px")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("font-size", "12px")
      .style("opacity", 0);
      
    g.selectAll(".bar")
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity", 0.8);
          
        tooltip.transition()
          .duration(200)
          .style("opacity", 1);
          
        tooltip.html(`${d.name}<br/>Value: ${d.value}`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity", 1);
          
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });
      
    // Add window resize listener
    const handleResize = () => {
      tooltip.remove();
      svg.selectAll("*").remove();
      BarChart({ data });
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      tooltip.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, [data]);

  return <svg ref={svgRef} className="w-full h-full" />;
}

interface PieChartProps {
  data: ChartData[];
}

export function PieChart({ data }: PieChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const container = d3.select(svgRef.current.parentNode as HTMLElement);
    
    // Get the container dimensions
    const containerWidth = (container.node() as HTMLElement).getBoundingClientRect().width;
    const containerHeight = (container.node() as HTMLElement).getBoundingClientRect().height;
    
    const radius = Math.min(containerWidth, containerHeight) / 2.5;

    // Clear previous chart
    svg.selectAll("*").remove();

    // Set the SVG dimensions
    svg.attr("width", containerWidth)
       .attr("height", containerHeight);
    
    // Create a group with margin
    const g = svg.append("g")
                .attr("transform", `translate(${containerWidth/2},${containerHeight/2})`);
                
    // Add drop shadow filter
    const defs = svg.append("defs");
    const filter = defs.append("filter")
        .attr("id", "drop-shadow-pie")
        .attr("height", "130%");
    
    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 3)
        .attr("result", "blur");
    
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 0)
        .attr("dy", 3)
        .attr("result", "offsetBlur");
    
    const feComponentTransfer = filter.append("feComponentTransfer");
    feComponentTransfer.append("feFuncA")
        .attr("type", "linear")
        .attr("slope", 0.2);
    
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur");
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    // Create color scale with amber variations
    const color = d3.scaleOrdinal<string>()
      .domain(data.map((d: ChartData) => d.name || ""))
      .range([
        "#f59e0b", // amber-500
        "#d97706", // amber-600
        "#b45309", // amber-700
        "#92400e", // amber-800
        "#78350f", // amber-900
        "#fbbf24", // amber-400
        "#f59e0b", // amber-500
        "#d97706", // amber-600
      ]);

    // Create pie generator
    const pie = d3.pie<ChartData>()
      .value((d: ChartData) => d.value)
      .sort(null);

    // Create arc generators
    const arc = d3.arc<d3.PieArcDatum<ChartData>>()
      .innerRadius(radius * 0.4)
      .outerRadius(radius);

    const outerArc = d3.arc<d3.PieArcDatum<ChartData>>()
      .innerRadius(radius * 1.1)
      .outerRadius(radius * 1.1);
      
    // Add a light circle in the center for contrast
    g.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", radius * 0.38)
      .attr("fill", "#111")
      .attr("opacity", 0.3);

    // Create arcs
    const arcs = g.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    // Add paths with animation
    arcs.append("path")
      .attr("d", arc)
      .attr("fill", (d: d3.PieArcDatum<ChartData>) => color(d.data.name || "") as string)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("filter", "url(#drop-shadow-pie)")
      .attr("opacity", 0)
      .transition()
      .duration(800)
      .delay((d, i) => i * 100)
      .attr("opacity", 1)
      .attrTween("d", function(d) {
        const interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
        return function(t) {
          return arc(interpolate(t));
        };
      });

    // Add labels with lines
    const labelGroups = arcs.append("g")
      .attr("class", "label-group")
      .attr("opacity", 0)
      .transition()
      .duration(500)
      .delay((d, i) => 800 + i * 100)
      .attr("opacity", 1);
      
    arcs.select(".label-group")
      .append("polyline")
      .attr("points", function(d: d3.PieArcDatum<ChartData>) {
        const pos = outerArc.centroid(d);
        const midAngle = Math.atan2(pos[1], pos[0]);
        const x = Math.cos(midAngle) * (radius * 1.15);
        const y = Math.sin(midAngle) * (radius * 1.15);
        return [arc.centroid(d), outerArc.centroid(d), [x, y]];
      })
      .attr("stroke", "rgba(255, 255, 255, 0.5)")
      .attr("fill", "none")
      .attr("stroke-width", 1);
      
    arcs.select(".label-group")
      .append("text")
      .attr("transform", function(d: d3.PieArcDatum<ChartData>) {
        const pos = outerArc.centroid(d);
        const midAngle = Math.atan2(pos[1], pos[0]);
        const x = Math.cos(midAngle) * (radius * 1.2);
        const y = Math.sin(midAngle) * (radius * 1.2);
        return `translate(${x}, ${y})`;
      })
      .attr("text-anchor", function(d: d3.PieArcDatum<ChartData>) {
        const pos = outerArc.centroid(d);
        return (pos[0] >= 0) ? "start" : "end";
      })
      .attr("font-size", "12px")
      .attr("fill", "white")
      .text((d: d3.PieArcDatum<ChartData>) => 
        d.data.name && d.data.name.length > 15 
          ? d.data.name.substring(0, 15) + '...' 
          : d.data.name || ""
      );
      
    // Add tooltips
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("padding", "8px")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("font-size", "12px")
      .style("opacity", 0);
      
    arcs.on("mouseover", function(event, d) {
      d3.select(this).select("path")
        .transition()
        .duration(200)
        .attr("transform", function() {
          const [x, y] = arc.centroid(d);
          return `translate(${x * 0.1}, ${y * 0.1})`;
        });
        
      tooltip.transition()
        .duration(200)
        .style("opacity", 1);
        
      tooltip.html(`${d.data.name}<br/>Value: ${d.data.value}`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
      d3.select(this).select("path")
        .transition()
        .duration(200)
        .attr("transform", "translate(0, 0)");
        
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });
      
    // Add window resize listener
    const handleResize = () => {
      tooltip.remove();
      svg.selectAll("*").remove();
      PieChart({ data });
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      tooltip.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, [data]);

  return <svg ref={svgRef} className="w-full h-full" />;
} 