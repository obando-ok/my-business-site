"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Brain, Dumbbell, DollarSign, Sparkles } from "lucide-react";
import { ReactNode } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function SelfMasteryPage() {
  return (
    <section className="min-h-screen px-6 py-24 md:px-20 bg-gradient-to-br from-black via-zinc-900 to-neutral-900 text-neutral-100">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-5xl mx-auto text-center space-y-6"
      >
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
          Master the Core Pillars of a Strong Man
        </h1>
        <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
          Build discipline, purpose, and resilience by aligning your habits across four foundational arenas.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-24 max-w-6xl mx-auto">
        {pillars.map((pillar, index) => (
          <PillarCard key={pillar.title} index={index} {...pillar} />
        ))}
      </div>

      <div className="mt-32 space-y-28 max-w-5xl mx-auto text-left text-neutral-300">
        {sections.map((section, index) => (
          <Section key={section.title} index={index} {...section} />
        ))}
      </div>

      <div className="mt-32 text-center space-y-6">
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="text-neutral-400 text-lg"
        >
          Ready to put it into action?
        </motion.p>
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex justify-center gap-4 flex-wrap"
        >
          <Button className="bg-primary hover:bg-primary/90 text-white text-sm px-6 py-2">
            Begin Self-Evaluation →
          </Button>
          <Button
            variant="outline"
            className="text-sm px-6 py-2 border-neutral-700 hover:border-neutral-500"
          >
            Visit Mission Control
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function PillarCard({ icon, title, description, index }: { icon: ReactNode; title: string; description: string; index: number; }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 hover:border-zinc-600 rounded-2xl p-6 text-left shadow-inner hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-white tracking-tight">
          {title}
        </h3>
      </div>
      <p className="text-sm text-neutral-300 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

function Section({ title, text, quote, index }: { title: string; text: string; quote: string; index: number; }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="space-y-5"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
        {title}
      </h2>
      <p className="text-md md:text-lg leading-relaxed whitespace-pre-line">
        {text}
      </p>
      <blockquote className="border-l-4 border-neutral-700 pl-4 italic text-neutral-400 text-base md:text-lg">
        “{quote}”
      </blockquote>
    </motion.div>
  );
}

const pillars = [
  {
    icon: <Brain className="h-10 w-10 text-blue-400" />,
    title: "Mental Strength",
    description:
      "Train your mind like a muscle. A strong mind resists temptation, overcomes fear, and remains composed under stress. Mental clarity and focus are prerequisites to any form of leadership or long-term success.",
  },
  {
    icon: <Dumbbell className="h-10 w-10 text-red-400" />,
    title: "Physical Discipline",
    description:
      "Your body is a reflection of your habits. Consistent training, proper nutrition, and rest are the foundation of energy, confidence, and presence. Physical discipline teaches delayed gratification and resilience.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-purple-400" />,
    title: "Spiritual Grounding",
    description:
      "Without spiritual grounding, it's easy to lose direction. Faith or a strong value system gives you moral clarity and the strength to persevere through suffering. Purpose begins with something greater than yourself.",
  },
  {
    icon: <DollarSign className="h-10 w-10 text-yellow-400" />,
    title: "Financial Leadership",
    description:
      "Money enables freedom and responsibility. It's not about greed, it's about being able to support, invest, and create. Master your finances, or you’ll always be dependent on someone else’s leadership.",
  },
];

const sections = [
  {
    title: "Mental Strength",
    text: `Mental strength is the foundation of all transformation. It is your ability to think clearly, act intentionally, and remain composed in the face of adversity.

Discipline is not a trait—it’s a practiced behavior. You don’t wake up mentally strong. You earn it daily.

1. Clarity Over Chaos
In a world flooded with noise, mental strength begins with filtering your input. Avoid distraction like poison. Curate your digital diet. Protect your peace.
- Unfollow accounts that feed insecurity or outrage.
- Block notifications during focused work blocks.
- Schedule solitude to hear your own thoughts.

2. Train the Observer
You are not your thoughts. Learn to observe them. Meditation isn't about clearing your mind—it’s about detaching from the noise. Journal to confront what's inside.
- Write morning pages: stream of consciousness writing for 10 minutes.
- Ask yourself nightly: “What did I avoid today? Why?”
- Use breathwork to recenter when overwhelmed.

3. Choose Hard Things
Comfort weakens the mind. Seek challenges that force growth. Cold showers, difficult conversations, social resistance—these are reps for the mind.
- Say what needs to be said.
- Show up when it’s inconvenient.
- Sit in discomfort without reaching for escape.

4. Embrace Boredom
Most men numb themselves because they fear being alone with their thoughts. Boredom is the birthplace of insight. Don't run—listen.
- Spend time in nature without music or distractions.
- Go on silent walks—let your thoughts surface.
- Reflect without judgment.

5. Read What Scares You
Read books that offend, challenge, or stretch you. Growth doesn’t happen in agreement—it happens in friction.
- Rotate between philosophy, biographies, and strategy books.
- Annotate aggressively. Debate the author. Let the text provoke you.

6. Delay Reaction
Mental strength shows when you’re triggered. Practice response over reaction.
- Before replying, breathe for 5 seconds.
- Ask: “What’s the outcome I want here?”
- Let your values guide you, not your emotions.

7. Know Your Inner Voice
That voice that tells you to skip the workout, snooze the alarm, or scroll instead of study? That’s the voice you must train to ignore.
- Give that voice a name. Make it an enemy.
- Replace it with the voice of the man you want to become.

8. Visualize Pain
Don’t just visualize success. Visualize hardship. Picture failure. Picture your family suffering because you didn’t do your job. That kind of pressure clarifies your priorities.

9. Mental Reps
Just like you train your body, train your mind:
- Solve puzzles daily (chess, logic, strategy).
- Write reflections on your failures and wins.
- Do 30-day challenges to build resilience.

10. Stop Outsourcing Your Thinking
Do your own research. Think through consequences. Be a man of principle, not popularity.

11. Journal Prompts for Strength
- “What fear am I pretending not to feel?”
- “Where am I lying to myself?”
- “What would the man I respect do in this situation?”

12. Anchor in Identity
Mental toughness doesn’t come from hype. It comes from knowing who you are. Build an identity that can endure.
- "I am the kind of man who finishes what he starts."
- "I don't fold. I adapt."
- "Pressure reveals my character, not my panic."

13. Emotional Mastery
Strength isn't stoicism. It’s mastery. It’s knowing what you feel, owning it, then acting with clarity—not avoidance.

14. Iron in the Mind
Hard times are gifts. Without struggle, there’s no steel in your soul. Every disappointment, every betrayal—it’s fuel.
- Use it to build focus, not bitterness.
- Use it to sharpen, not shame.

15. Be the Calm
Mental strength is what allows you to lead in chaos. Be the calmest man in the room—not because nothing affects you, but because you know how to center yourself.
`,
    quote: "You will never always be motivated, so you must learn to be disciplined.",
  },
  {
    title: "Physical Discipline",
    text: `Your body is your first home, your vessel, and your battlefield. Physical discipline is about mastery of that vessel—strengthening it to serve, to lead, and to endure.

1. Movement is Mandatory
Sedentary life is silent decay. A strong man must move daily.
- Train 4-6x per week (strength, cardio, flexibility).
- Use your body in manual work: walk, carry, chop, lift.
- Treat walking as non-negotiable. It clears the mind and maintains function.

2. Build Rituals, Not Resolutions
Motivation fades. Systems win.
- Morning training: body leads the day, not feelings.
- Schedule training in calendar like a business meeting.
- Choose consistency over intensity. One missed day easily becomes one missed week.

3. Train for Life, Not Ego
You are not in the gym to show off—you’re there to sharpen.
- Focus on form, control, and progressive overload.
- Track lifts, reps, rest, and recovery.
- Avoid injuries by training with patience, not pride.

4. Strength is Responsibility
Strength allows you to carry others. To protect. To endure storms without breaking.
- Carry heavy loads (literally and figuratively).
- Do hard labor tasks instead of outsourcing everything.
- Train like someone’s life depends on your conditioning.

5. Food is Fuel, Not a Crutch
- Cook your own meals. Know what you’re eating.
- Eat to build, not to sedate.
- Learn macros, micros, fasting, hydration, and digestion.
- Eliminate excess: sugar, seed oils, processed garbage.

6. Sleep Like a Warrior
- 7–9 hours, cold, dark, and phone-free.
- Track your quality (not just quantity).
- No caffeine after 2PM. No blue light before bed.
- Sleep = recovery = gains.

7. The Morning Frame
The first hour sets the tone for the entire day.
- Wake up before the world. Train. Reflect. Set intention.
- No screens for 60 minutes.
- Cold exposure + hydration + movement = dominance.

8. Pain is the Teacher
Learn to welcome pain as feedback. It builds grit.
- Push through the burn.
- Train when you’re tired.
- Use soreness as a reminder that you’re evolving.

9. Discipline Over Emotion
You won’t always feel like it. Train anyway.
- Don’t wait to be in the mood.
- “Just one set” turns into full sessions.
- Consistency is more powerful than bursts of enthusiasm.

10. Master the Basics
- Squat, deadlift, press, pull, sprint, stretch.
- Track your PRs. Compete with yourself.
- Never skip legs. Never neglect core. Never avoid cardio.

11. Track Everything
- Log training. Log meals. Log sleep.
- Reflect weekly: what’s improving? What’s slipping?
- Awareness turns habits into high-performance tools.

12. Train With Intention
- Visualize the man you’re becoming as you lift.
- Listen to silence or war music—not distractions.
- Every session is a deposit into future strength.

13. Sweat = Sanity
- Burn off anxiety. Move through anger. Sweat through fear.
- Emotional regulation is built through the physical realm.
- You can’t be anxious mid-sprint or mid-rep.

14. Longevity is Strength
- Mobility > ego lifting.
- Recovery > burnout.
- Consistency > extremes.

15. Rest With Purpose
- Sleep. Sauna. Stretch. Breathe.
- Use active rest: walks, yoga, swims.
- Don’t earn rest—use it wisely.

16. Train Like a Leader
- Your sons, your brothers, your team—they’re watching.
- Show them what responsibility looks like.
- Be the fittest man in the room, not to boast, but to serve.

17. Train When It’s Raining
- When the world makes excuses, you go.
- Rain, snow, stress, work—you adapt.
- Be the exception. Be the one they can't break.

18. Make Your Body a Testament
Let your posture, your strength, your endurance—tell the world who you are.
- You walk like a man with discipline.
- You carry the burden with grace.
- You stand in pain without flinching.

19. Don’t Let the Mirror Lie to You
- You may look fit and still be weak.
- Train for truth, not for attention.
- Function > flex.

20. Own the Process
- There are no hacks. No secrets. Just relentless repetition.
- Build the body. Build the man.
- Be forged, not pampered.

Every drop of sweat is a step toward the version of you that can carry the weight of his mission.
`,
    quote: "Suffer the pain of discipline or suffer the pain of regret.",
  },
  {
    title: "Spiritual Grounding",
    text: `Spiritual grounding is not religiosity—it’s alignment. It’s knowing who you are beyond the flesh and mind. In a chaotic world, it is the root system that keeps a man from being blown away.

1. Ground Yourself Daily
- Begin each day in silence or prayer.
- Read something sacred or challenging.
- Journal to reconnect with purpose.

2. Create a Sacred Rhythm
- Weekly sabbath or digital detox.
- Time in nature, time in stillness.
- Worship or ritual that brings alignment.

3. Define Your Moral Code
A grounded man does not borrow convictions—he defines them.
- What do you stand for?
- What will you never do, no matter what?
- What are your non-negotiables?

4. You Are Not God
Ego dies when you realize you're not the center of the universe.
- Surrender is strength.
- Let go of control. Accept what you can't change.
- Live with reverence, not arrogance.

5. Study Timeless Wisdom
- Read scripture, stoicism, ancient philosophy.
- Reflect on parables, truths, and principles.
- Extract meaning, not just information.

6. Discipline the Spirit
- Fast periodically to reset your flesh.
- Practice silence—let the noise settle.
- Say no to urges, even when no one is watching.

7. Know Your Purpose
- Why are you here?
- What legacy will you leave?
- What mission makes your suffering meaningful?

8. Seek Truth, Not Trend
- Don’t chase spiritual trends or feel-good beliefs.
- Truth is unchanging. It doesn't conform to convenience.
- Stand firm when others drift.

9. Surround Yourself with Men of Depth
- Isolation kills. Brotherhood strengthens.
- Pray together. Share scripture. Speak truth.
- Call each other higher.

10. Lead Spiritually
- In your family. In your circle. In your actions.
- Be the reason others turn to something greater.
- Carry faith with strength, not show.

11. Resist Idolatry
- Don’t worship status, comfort, or image.
- Remove anything that replaces your higher power.
- Keep first things first.

12. Walk in Forgiveness
- Release bitterness. It poisons purpose.
- Forgive yourself. Start again.
- Forgive others. You’re not perfect either.

13. Return to Alignment
- When you fall, return.
- When you drift, realign.
- Grace is a return, not a reward.

14. Teach the Next Generation
- Model values in word and deed.
- Read to your children. Pray with them.
- Leave a spiritual inheritance.

15. Live as if Watched by God
- Let your private life honor your Creator.
- Every choice matters.
- Live upright, not because you're seen—but because it’s right.

16. Gratitude is Grounding
- List your blessings daily.
- Thank before you ask.
- Humility breeds strength.

17. Suffering is Refinement
- Trials shape your soul.
- Pain purifies. Don’t waste it.
- Ask: "What is this making of me?"

18. Serve With No Applause
- Help the poor. Support the broken.
- Do it quietly. For heaven’s approval.
- Greatness is in humility.

19. Return to Awe
- Look at stars. Watch storms. Hold a newborn.
- Be humbled by majesty.
- A man who kneels before the eternal doesn’t kneel to men.

20. Become the Sanctuary
- Be the peace in the room.
- Be the integrity when none is found.
- Be the light in the storm.

True spiritual grounding doesn’t make you soft. It makes you immovable.
`,
    quote: "He who has a why to live can bear almost any how.",
  },
  {
    title: "Financial Leadership",
    text: `Financial leadership is not about greed—it’s about dominion. A man who cannot control his finances cannot lead with strength or freedom. This pillar is about mastering your resources, so they never master you.

1. Know Your Numbers
- Track income, expenses, savings, and debt weekly.
- Set financial dashboards and alerts.
- Know where every dollar is going.

2. Live Beneath Your Means
- Spend like your future depends on it—because it does.
- Buy for value, not validation.
- Cut waste. Cut ego. Cut excuses.

3. Build an Emergency Fund
- Aim for 6–12 months of living expenses.
- This is not optional—it’s insurance for risk and clarity.
- Peace of mind builds boldness.

4. Eliminate Consumer Debt
- Pay off credit cards in full. Avoid interest traps.
- Learn snowball and avalanche debt strategies.
- Debt enslaves. Freedom builds momentum.

5. Invest with Intention
- Automate monthly contributions to diversified accounts.
- Learn stocks, index funds, real estate, and crypto.
- Invest in assets, not liabilities.

6. Earn More, Not Just Save
- Develop high-income skills: sales, tech, leadership.
- Take ownership of your earning power.
- Create multiple income streams.

7. Learn the Tax Game
- Study tax strategy like your net worth depends on it.
- Maximize legal write-offs and deductions.
- Work with CPAs who think long-term.

8. Delay Gratification
- Don’t upgrade lifestyle with every raise.
- Delay luxury until it becomes effortless.
- Sacrifice now to build later.

9. Give Generously, Strategically
- Tithe, donate, support missions.
- Give from a place of strength, not guilt.
- Money flows to those who steward well.

10. Build a Financial Fortress
- Life insurance, wills, trusts.
- Protect your family from your absence.
- Plan like a patriarch.

11. Automate Everything
- Auto-invest, auto-save, auto-pay.
- Remove friction between vision and execution.
- Free your mental energy for creativity.

12. Upgrade Your Circle
- Talk money with men who have fruit on the tree.
- Avoid financial victims and complainers.
- Iron sharpens iron.

13. Build Ownership, Not Employment
- Own your schedule, your income, your outcomes.
- Start a side business or monetize a skill.
- Equity > salary.

14. Use Tools Wisely
- Budgeting apps. Financial books. Investing platforms.
- Technology is leverage—master it.
- Don’t outsource thinking—understand the tools.

15. Think in Decades
- Short-term sacrifice. Long-term compounding.
- Don’t envy—execute.
- Play the long game.

16. Money is a Mirror
- How you treat money is how you treat your life.
- Do you hide from it or lead it?
- Respect attracts provision.

17. Build Financial Literacy
- Read 1 financial book per month.
- Study the economy, currency, and capital.
- Understand wealth like a general understands war.

18. Never Be Dependent
- Never rely on one employer, one stream, or one handout.
- Diversify. Reinvent. Be unbreakable.
- Provide so no one else needs to.

19. Teach What You Learn
- Raise financially literate children.
- Share frameworks with brothers.
- Legacy starts with you.

20. Be a Builder
- Invest in things that outlive you: businesses, ministries, movements.
- Don’t just earn—establish.
- Build what your grandchildren will benefit from.

When a man becomes financially independent, he becomes emotionally stable, spiritually generous, and strategically powerful. Money doesn’t change you—it reveals who you truly are.
`,
    quote: "Formal education will make you a living; self-education will make you a fortune.",
  },
];