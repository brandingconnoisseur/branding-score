/**
 * Branding Connoisseur AI Configuration
 * 
 * This file contains the system prompt and AI integration placeholder
 * for the Branding Score™ chat assistant.
 */

// System prompt for OpenAI API integration
// Use this exact prompt when calling the OpenAI API from your backend
export const BRANDING_AI_SYSTEM_PROMPT = `
You are **Branding Connoisseur AI**, an AI assistant trained to think like a world-class brand strategist and creative director known as "The Branding Connoisseur". You are NOT a human and NOT Emmanuel; you are an AI that reflects his approach, standards and taste. Always be honest about being an AI if asked directly.

Your sole purpose is to help **brand owners** and **creatives**:
- understand their Branding Score™
- interpret their branding strengths and weaknesses
- improve their brand strategy, positioning, messaging, and creative direction
- plan practical next steps they can actually execute

You are plugged into an app called **Branding Score™** – a diagnostic that scores brands from 0–100 across five dimensions:
1. Identity
2. Clarity
3. Messaging
4. Ownership
5. Presence

You will often receive context such as:
- Total Branding Score (0–100)
- Tier: At Risk / Developing / Growing / Established
- Category scores (0–20 each): Identity, Clarity, Messaging, Ownership, Presence

When that context is present, you MUST:
1. Acknowledge their score and tier.
2. Highlight their top 1–2 strengths.
3. Highlight their top 1–2 weaknesses.
4. Prioritise the single most important thing they should fix first.
5. Give clear, practical recommendations tailored to their situation and resources.

Tone & style:
- Direct, honest, and no-nonsense, but never rude.
- Clear, structured, and practical – avoid vague theory.
- Speak like a sharp, culturally aware British branding expert who works with modern, ambitious founders.
- Use headings and bullets when it helps clarity.

Focus on branding and creative direction:
- Positioning, narrative, messaging, content pillars, visual direction (described in words), brand architecture and naming ideas.

If asked who you are, say:
"I'm Branding Connoisseur AI, an assistant trained to help with branding and creative direction. I'm not Emmanuel himself, but I'm built to help you in a similar way."
`;

// Type definitions for branding context
export type BrandingContext = {
  totalScore: number;
  tier: string;
  identityScore: number;
  clarityScore: number;
  messagingScore: number;
  ownershipScore: number;
  presenceScore: number;
};

// Mock AI responses for demo purposes
const getMockResponse = (userMessage: string, context: BrandingContext): string => {
  const { totalScore, tier, identityScore, clarityScore, messagingScore, ownershipScore, presenceScore } = context;
  
  // Find weakest and strongest categories
  const categories = [
    { name: 'Identity', score: identityScore },
    { name: 'Clarity', score: clarityScore },
    { name: 'Messaging', score: messagingScore },
    { name: 'Ownership', score: ownershipScore },
    { name: 'Presence', score: presenceScore },
  ];
  
  const sorted = [...categories].sort((a, b) => a.score - b.score);
  const weakest = sorted[0];
  const strongest = sorted[sorted.length - 1];
  
  // Different responses based on tier
  if (tier === 'At Risk') {
    return `I can see you're at ${totalScore}/100 – **${tier}** tier. That's a wake-up call, but it's fixable if you act now.

**Your weakest area:** ${weakest.name} (${weakest.score}/20). This needs urgent attention.

**Where to start:**
1. Fix your ${weakest.name.toLowerCase()} first – it's dragging everything else down
2. Get clear on your positioning: who you serve and what makes you different
3. Establish visual consistency across all platforms

The good news? You have nowhere to go but up. Focus on the fundamentals and you'll see improvement fast.

What specific area do you want to tackle first?`;
  }
  
  if (tier === 'Developing') {
    return `Your score is ${totalScore}/100 – **${tier}** tier. You've got the foundations, but they're not cohesive yet.

**Strongest area:** ${strongest.name} (${strongest.score}/20) – this is working well.

**Weakest area:** ${weakest.name} (${weakest.score}/20) – this is holding you back.

**My recommendation:**
Focus on ${weakest.name.toLowerCase()}. You've already proven you can execute (see your ${strongest.name.toLowerCase()}), so apply that same energy to your weakest area.

**Quick wins:**
- Audit your ${weakest.name.toLowerCase()} across all touchpoints
- Create a simple framework or guidelines document
- Implement consistent standards starting this week

What's stopping you from improving your ${weakest.name.toLowerCase()}?`;
  }
  
  if (tier === 'Growing') {
    return `Solid work – you're at ${totalScore}/100, **${tier}** tier. Your brand is on track, now it's about refinement.

**What's working:** ${strongest.name} (${strongest.score}/20) is strong.

**What needs polish:** ${weakest.name} (${weakest.score}/20) has room for improvement.

**Next-level strategy:**
You don't need to rebuild – you need to optimise. Look at your ${weakest.name.toLowerCase()} and ask: "Does this reflect the same quality as my best work?"

**Upgrade path:**
- Elevate your ${weakest.name.toLowerCase()} to match your ${strongest.name.toLowerCase()}
- Deepen audience engagement
- Ensure every touchpoint feels premium

How can I help you sharpen your ${weakest.name.toLowerCase()}?`;
  }
  
  // Established
  return `Exceptional – ${totalScore}/100, **${tier}** tier. Your brand is operating at a high level.

**Strengths:** ${strongest.name} (${strongest.score}/20) and your overall consistency.

**Opportunity:** Even your "weakest" area (${weakest.name} at ${weakest.score}/20) is decent, but there's always room to optimise.

**Strategic focus:**
At this level, it's about:
- Maintaining your competitive edge
- Staying ahead of market shifts
- Deepening emotional connections with your audience

**My suggestion:**
Don't rest. Review your ${weakest.name.toLowerCase()} – can you push it from "good" to "exceptional"? Small refinements at this stage create outsized impact.

What's your next big brand move?`;
};

/**
 * Send a message to the Branding Connoisseur AI
 * 
 * TODO: Replace this mock implementation with a real API call to your backend
 * that integrates with OpenAI's API using the BRANDING_AI_SYSTEM_PROMPT above.
 * 
 * Example backend implementation:
 * 
 * POST /api/branding-chat
 * Body: {
 *   message: string,
 *   context: BrandingContext,
 *   conversationHistory: Array<{role: 'user' | 'assistant', content: string}>
 * }
 * 
 * Backend should call OpenAI API with:
 * - system: BRANDING_AI_SYSTEM_PROMPT
 * - user context message including scores
 * - conversation history
 * - user's current message
 * 
 * @param userMessage - The user's chat message
 * @param brandingContext - The user's branding scores and tier
 * @returns Promise resolving to the AI's response string
 */
export async function sendMessageToBrandingAI(
  userMessage: string,
  brandingContext: BrandingContext
): Promise<string> {
  // TODO: Replace this with your real backend API call
  // Example:
  // const response = await fetch('/api/branding-chat', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     message: userMessage,
  //     context: brandingContext,
  //     systemPrompt: BRANDING_AI_SYSTEM_PROMPT
  //   })
  // });
  // const data = await response.json();
  // return data.message;
  
  // Mock implementation - simulates API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMockResponse(userMessage, brandingContext));
    }, 1500); // Simulate network delay
  });
}
