---
title: Spring 2024, Week 1 - AlphaGeometry, Self-Rewarding Models, and Tuning Models by Proxy
date: 01/29/2024
author: Ron Nachum and Eli Olcott
published: true
---

# AlphaGeometry, Self-Rewarding Models, and Tuning Models by Proxy

**Notes by Ron Nachum, Blog by Eli Olcott**

## Introduction

In the fast-paced world of artificial intelligence, researchers are continuously pushing the boundaries to create systems that are not only powerful but also more efficient, adaptable, and capable of solving complex problems.

One of the most significant hurdles in AI development is the challenge of solving complex mathematical problems, particularly geometric proofs. This has seen a revolutionary development with AlphaGeometry, which used synthetic data to help the model perform significantly better.

Additionally, with the rise of discussions around Artificial General Intelligence (AGI), the pursuit of superhuman AI capabilities has highlighted the limitations of traditional feedback methods. This prompted Meta researchers to explore the concept of superhuman feedback, moving beyond the constraints of Reinforcement Learning from Human Feedback (RLHF) to Direct Preference Optimization (DPO).

Lastly, fine-tuning of large language models (LLMs) like GPT-4 have traditionally required extensive computational resources, so researchers from University of Washington introduced proxy-tuning, a novel method that allows for efficient tuning at decoding-time.

This leaves us with three important questions:

1. Can synthetic data be used to train large language models to solve challenging problems?
2. Can large language models start to self-improve?
3. Is proxy-tuning the new cheaper fine-tuning?

Throughout this blog we will dive into the details of each of these papers, provide details into how each one works, and ask some broader questions about the implications all of this may have.

## AlphaGeometry - Using Synthetic Data To Create A Math Genius

AlphaGeometry's innovation lies in its hybrid approach, combining a neural language model with a symbolic deduction engine. The neural model, trained from scratch on a vast corpus of synthetic data, generates potential steps in a proof, while the symbolic engine meticulously verifies these steps. This dynamic loop continues until the proof is found or a set iteration limit is reached. This approach, supposedly, mirrors the human brain's ability to search for solutions but with the relentless precision and speed of a machine.

As discussed in the paper, one of the significant challenges in developing AlphaGeometry was translating geometric proofs, which are often visually intuitive for humans, into machine-verifiable languages. The team addressed this by extending the vocabulary of an existing geometry language (GEX) and creating a diagram builder language. They were able to extend the GEX by using synthetic data to come up with an additional 100 million data points that the model could use. This allowed the system to interpret and manipulate geometric constructs in a way that machines could understand and verify.

By generating proof examples and heuristics algorithmically, the system sidesteps the biases and constraints inherent in human-created datasets. This synthetic approach ensures a broader and more diverse range of proof scenarios, enabling the AI to learn from a rich tapestry of geometric challenges.

A standout feature of AlphaGeometry is the 'Rabbit' algorithm, which focuses on generating auxiliary constructions within proofs. This algorithm fine-tunes the language model to prioritize specific parts of proofs, continuously expanding the initial state until a solution emerges. By using beam search to generate new sentences and retrying with the symbolic engine, AlphaGeometry can explore a vast space of potential solutions efficiently.

> "Our paper shows that language models can learn to come up with auxiliary constructions from synthetic data, in which problem statements and auxiliary constructions are randomly generated together and then separated using the traceback algorithm to identify the dependency difference. Concretely, the AlphaGeometry framework requires the following ingredients: an implementation of the domain’s objects and definitions, a random premise sampler, the symbolic engine(s) that operate within the implementation, and a traceback procedure for the symbolic engine."

**My Thoughts:**

This leap forward in mathematical capabilities is very impressive, I believe the results speak for themselves. With that said, I would compare this to a generative search more than I would think of this as advanced mathematical reasoning. Its ability to be able to algorithmically generate, check, and adjust its constructions to solve the problems is impressive, but I am unconvinced that this accurately emulates the type of intelligence that will create "super intelligence". Instead, I see this as an impressive display of an algorithms ability to prune unlikely results using language model's ability to

Nonetheless, I believe the use of synthetic data and a hybrid approach between LLMs and a verification step is fascinating. This shows the types of use cases, like generating and checking proofs, where synthetic data can be used to significantly improve performance. Furthermore, this algorithm could be useful in a number of fields if adjusted. For example, the ability to prove runtimes of different code algorithms using the hybrid approach of adding additional lines of pseudo-code and verifying it could possibly be improved with synthetic data of new constructions of code.

## Self-Improving AI: The Road To AGI?

In the world of artificial intelligence, the quest for creating superhuman agents is an ongoing journey filled with challenges and breakthroughs. A recent research paper by Meta delves into the intricacies of training AI systems that outperform human capabilities, shedding light on the need for superhuman feedback and innovative training methods.

By definition, training AI to reach superhuman levels requires feedback that transcends human performance. Traditional methods like Reinforcement Learning from Human Feedback (RLHF) and Proximal Policy Optimization (PPO) have shown limitations, as they are bottlenecked by the inherent constraints of human feedback. To address this, the researchers explored an advanced method known as Direct Preference Optimization (DPO).

RLHF/PPO relies on frozen reward models, which can only improve as much as the human feedback allows. In contrast, DPO leverages direct human preferences without freezing the reward model, enabling a more dynamic and effective training process. This method, however, still encounters bottlenecks from human performance, necessitating further innovation.

## Resources

AlphaGeometry: An Olympiad-level AI system for geometry [Paper](https://drive.google.com/file/d/181E2gbWl8-0nbf520QuDCbAtKchO8-zE/view?usp=drive_link), [Blog Post](https://deepmind.google/discover/blog/alphageometry-an-olympiad-level-ai-system-for-geometry/), [Video](https://www.youtube.com/watch?v=TuZhU1CiC0k&ab_channel=TrieuHobbies)

Self-Rewarding Language Models [Paper](https://drive.google.com/file/d/1Q389tu12o8JkvbkU8nnGGzrnvsvH2xxC/view?usp=drive_link)

Tuning Language Models [Paper](https://drive.google.com/file/d/1gqUiQl2M1hoNDD5EPLiBtFXBZM9BtZcS/view?usp=drive_link)
