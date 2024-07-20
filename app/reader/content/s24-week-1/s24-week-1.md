# AlphaGeometry, Self-Rewarding Models, and Tuning Models by Proxy

## Introduction

Resources:

* AlphaGeometry: An Olympiad-level AI system for geometry [Paper](https://drive.google.com/file/d/181E2gbWl8-0nbf520QuDCbAtKchO8-zE/view?usp=drive_link), [Blog Post](https://deepmind.google/discover/blog/alphageometry-an-olympiad-level-ai-system-for-geometry/), [Video](https://www.youtube.com/watch?v=TuZhU1CiC0k&ab_channel=TrieuHobbies)
* Self-Rewarding Language Models [Paper](https://drive.google.com/file/d/1Q389tu12o8JkvbkU8nnGGzrnvsvH2xxC/view?usp=drive_link)
* Tuning Language Models [Paper](https://drive.google.com/file/d/1gqUiQl2M1hoNDD5EPLiBtFXBZM9BtZcS/view?usp=drive_link)

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

AlphaGeometry's innovation lies in its hybrid approach, combining a neural language model with a symbolic deduction engine. The neural model, trained from scratch on a vast corpus of synthetic data, generates potential steps in a proof, while the symbolic engine meticulously verifies these steps. This dynamic loop continues until the proof is found or a set iteration limit is reached. This approach mirrors the human brain's ability to search for solutions but with the relentless precision and speed of a machine.

One of the significant challenges in developing AlphaGeometry was translating geometric proofs, which are often visually intuitive for humans, into machine-verifiable languages. The team addressed this by extending the vocabulary of an existing geometry language (GEX) and creating a diagram builder language. This allowed the system to interpret and manipulate geometric constructs in a way that machines could understand and verify.

