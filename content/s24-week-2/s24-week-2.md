---
title: Spring 2024, Week 2 - Mixture of Experts, Mixtral and its convergence with Instruction Tuning
date: 02/05/2024
author: Ron Nachum and Emmanuel Rassou
published: false
---

# 🧪Mixture of Experts, Mixtral and its convergence with Instruction Tuning

**Notes by Ron Nachum, Blog by Emmanuel Rassou**

## Introduction

You are strategizing a team of say four members to win a trivia competition. How would you coordinate how to prepare for such a competition? If everyone learns the same facts this would lead to duplication across team members, and this focuses on breadth per person. It's natural to think of dividing the universe of questions into specific domains of knowledge that each team member can learn in depth (say Science, Art & History, Film & Media, Geography). This is the main motivation behind Mixture of Experts, a new paradigm of models that has an underlying division of its parameters into different expert agents each capable of learning a separate subspace of the task at hand.

[Mistral AI](https://mistral.ai/company/) is the first company to capitalize on such innovation for NLP tasks. Better yet, they are pro-open source! With the release of Mixtral 8x7b they prove to demonstrate how open source can strive to compete with giant foundational LLMs.

Lastly, researchers from Google et al. show the newfound synergy between Mixture of Experts and Instruction Tuning. Is this the golden formula to trump all LLMs?

Let's dive right in to find out!


## Mixture of Experts (MoEs) : Many Gates Make Light Work

Before MoEs, scaling laws showed that increase in size of the model corresponded to an increase in response quality. So with a fixed compute budget, a large model trained for a few steps is better than a small model trained for more steps. But what if we could find a compute-efficient way to train a large model for many steps? MoE layers are more sparse than feed forward networks (FFN) and this saves compute.

For LLMs, [tokens](https://www.johno.com/tokens-vs-words) are fed in one by one to train the model. Ideally each token should only be processed by one expert. In order to figure out which token is in the domain of expertise of a specific expert, a new component called a gate network/ router is employed.

// paste gate routing expression

These gate functions G are also trained. Even though the weighted multiplication involves all experts, the router ensures G will be 0 for some token values which will save compute. 

Even though the total parameter count is not reduced, we only care about the parameters that a single token touches. MoE’s reduce this _active_ parameter count significantly because of how sparsity is introduced with the gate routers.

This new architecture does come with its fair share of challenges. The most prominent of which is load-balancing. A good question would be what happens if there is one really good expert which essentially makes all the other “experts” useless ([like in a trivia competition](https://www.youtube.com/watch?v=steaizIyMn8)). It turns out that MoE training converges to mostly activating the same expert. 

To encourage equal importance, an auxiliary loss is introduced. One type of loss at the router-level is called _router z-loss_. By penalizing large values entering the gate network, it improves the stability of all experts without degrading the model quality.

Another concern is that increasing the number of experts usually leads to faster speedups, however, at some point it gives diminishing returns. More importantly each expert has to be loaded into memory separately requiring more VRAM. Thus, 2, 4 or 8 experts are usually used.

**My Thoughts: **

In a world where AI is increasingly becoming the supermind behind almost all innovation, it's very plausible that we are transitioning from big linear algebra computations to more intricate models that emulate a brain. MoE’s bring us one step closer to this convergence. With so much data out there in the world, a lot more focus is spent innovating the training loops of models with data and model parallelism (e.g. [ML Pathways at Google](https://blog.google/technology/ai/introducing-pathways-next-generation-ai-architecture/)). There have been nuances and intricacies overlooked in this blog post. With innovation comes complexity and new challenges that researchers have to tackle. That said, these models have potential to spur a twist in the race for the most capable AI models. 


## Mixtral of Experts 8x7b : Transforming Theory into Practice

This model has 8 experts in total, and for every token it uses a combination of two of the most relevant ones for inference. This is in turn a way to dampen the need for load balancing. Each token has access to 47B parameters, however, the active parameter count is only 13B (≈1/4). This is quite a reduction considering that this model outperforms both Llama 2 70B and GPT 3.5, whilst having faster inference speed.

After designing the architecture and training the model, they also used instruction fine-tuning to boost its instruction following capability (next section). 

The mere existence of this model is impressive, however, the paper goes further to reveal interesting insights behind the exact route each token takes. Unfortunately there was no evidence for the topic of the token being the main driver for the assignment of tokens. They tested this with various datasets and only found [DM Mathematics](https://github.com/google-deepmind/mathematics_dataset) to exhibit domain-driven routing. One thought is that the synthetic nature of math symbols make it easier to categorize as opposed to words from spoken language.

Contrary to the above, there was structured behavior when it came to syntax of programming languages. This was best seen with Python where experts were given separate indentations (columns) of the Python script. Another finding is that consecutive tokens appeared to be routed to the same expert. This surprising locality of tokens has pros and cons. Whilst it does limit parallelism which is needed for GPUs to accelerate model inference, it can also be leveraged for efficient caching.

**My Thoughts**:

Oftentimes we see a cool research idea find trouble landing its mark in the real world. I believe Mixture of Experts is not one of those cases. Even though the 8x7b version did not fully actualize the idea of having multiple domain experts, it did show that such sparse architectures can compete with its dense siblings. All in all, I think the potential for the next paper down the line is really exciting, especially since the model is fully open source.


## MoE Meets Instruction Tuning : Squeezing out Success with Ingenuity

The one caveat with sparse models is that they are very data-hungry, and so when the large dataset used during training is replaced with a more limited dataset for fine tuning, its performance drops lower than the denser models. The main reason being that the model overfits, hence forgetting what it has learnt during pre training. Instruction fine-tuning hopes to mitigate this. But what exactly is it? 

Conventional fine tuning feeds the LLM task-specific data so that the model can better specialize what humans want it to do in some question-answer format. Instruction fine tuning takes this one step further by also providing the instruction for each data pair. For example instead of giving the pairs (“hello”, “bonjour”), (“goodbye”, “adiós”), we expand it to include the instruction: (“hello”, “bonjour”, “Translate from english to french”), (“goodbye”, “adiós”, “Translate from english to spanish”). This extra guidance becomes the key driving factor for FLAN-MOE’s success. 

On top of this adjustment to the MOE training regime, the researchers also experimented with other ideas. A natural one to combat overfitting is introducing auxiliary loss. This in fact kills two birds with one stone. By leveraging router Z-loss they could also improve the stability between experts. 

They also did an ablation study by freezing different types of parameters (MoE and non-MoE). This means fixing a subset of pretrained parameters so that fine-tuning only changes the remaining ones. Interestingly, only freezing non-MoE parameters leads to better results. 

Lastly, as the model size increased, expert specialization also improved, because of better division of labor among experts.

**My Thoughts:**

This paper lays out the true mark of an ML engineer: gradually improve the weaknesses of the model, whilst keeping the strengths in tact. It still baffles me how applications of very simple ideas such as instruction fine tuning can ignite a whirlwind of improvement. I would also suggest looking at the graphs comparing the performance of FLAN-MOE and FLAN-T5 (Google’s text-to-text transformer). Google’s wealth of compute really allows this paper to highlight the dominance of MoE in the research environment. I would not be surprised in the future if this architecture also dominates in the outside world. 


## Resources

Mixture of Experts Overview [Paper](https://huggingface.co/blog/moe)

Mixtral of Experts 8x7b [Paper](https://drive.google.com/file/d/1OOqCo0nPKP3-u8ynRFNiY9XNZIJcBu5s/view?usp=sharing)

MoE meets Instruction Tuning [Paper](https://drive.google.com/file/d/1GY1HqWBM1cHk3FPv0-HQQHfz9h_eMMri/view?usp=sharing)

Other resources 

[History of mixture of experts](https://www.linkedin.com/pulse/history-mixture-experts-upp-technology-ok9re/)

[More on fine tuning](https://www.analyticsvidhya.com/blog/2023/08/fine-tuning-large-language-models/#:~:text=Instruction%20fine%20tuning%20a%20model,training%20they%20have%20already%20undergone.)


