# ServeTruth — Adaptive AI Survey Integrity Detection

> **Status:** Work in progress · Research prototype

ServeTruth explores how online surveys and assessments can detect AI-assisted responses without automatically blocking legitimate participants. The project combines behavioral evidence, content-based checks, and adaptive decision-making to identify responses produced through copy-paste workflows, document uploads, and browser agents.

The long-term goal is an **Adaptive Defense Router** that selects the most informative integrity check for each question and escalates only when evidence accumulates.

## Why This Project Matters

Large language models can complete surveys, quizzes, and take-home assessments in ways that bypass traditional attention checks. A single fixed defense is rarely effective across every question type and attack mode, while enabling every defense at once can create unnecessary friction and false flags for honest respondents.

ServeTruth investigates whether adaptive checks can detect more AI-assisted responses while maintaining a low false-positive rate.

## Current Prototype

The repository currently includes:

- A React and Vite survey interface with open-text, multiple-choice, binary, and Likert-style questions
- A FastAPI service for accepting and validating survey submissions
- Collection of completion time, submission time, and browser metadata for prototype analysis
- Local JSON persistence for development and demonstration
- A foundation for adding behavioral and content-based integrity signals

## Planned Detection System

The research design combines several complementary mechanisms:

| Mechanism | Intended signal |
|---|---|
| Answer-key decoys | Detect selection of planted incorrect options in objective assessments |
| Opinion traps | Identify implausible responses or contradictions in survey answers |
| Canary and prompt-leak checks | Detect hidden instructions or tokens reproduced in generated answers |
| Behavioral checks | Evaluate completion time, paste events, focus changes, and typing patterns |
| Writing-style signals | Detect significant changes in response length, fluency, or style |

Not every mechanism applies to every question. The planned router selects checks based on the item type, available evidence, and burden placed on legitimate participants.

## Adaptive Routing Approach

The planned router uses a Sequential Probability Ratio Test to maintain a running evidence score:

```text
Question and eligible checks
            |
            v
Adaptive Defense Router
            |
            v
Serve item with selected mechanism
            |
            v
Observe response and behavioral signal
            |
            v
Update evidence score
            |
            v
Continue | Escalate | Pause for human review
```

The system is designed to support human review rather than automatically rejecting or blocking a respondent.

## Research Questions

1. How well does each detection mechanism work across question types, assessment types, and AI-use modes?
2. At a low false-positive rate, can adaptive routing outperform a single fixed mechanism or all mechanisms applied everywhere?
3. How many questions are needed before the router reaches a reliable decision?
4. How does detection change when an AI-assisted respondent is warned, mechanism-aware, or allowed to retry?

## Evaluation Plan

Evaluation is ongoing. The project is designed to compare the adaptive router with fixed-mechanism baselines across:

- Human and AI-generated responses
- Survey and quiz item types
- Copy-paste, document-upload, and browser-agent workflows
- Standard and more adaptive attacker behaviors
- Detection rate, human false-positive rate, and items required for a decision

Final quantitative results are not yet published.

## My Contributions

My work focuses on the data and detection components of the research system:

- Building survey and assessment dataset loaders with human-answer distributions
- Developing answer-key decoys, opinion traps, canary checks, and writing-style signals
- Running multi-model adversarial evaluations and organizing structured outcomes
- Building the failure-mode map used by the adaptive router
- Analyzing false-positive risks, including fairness concerns for non-native writers
- Reviewing shared data contracts and experimental outputs across the team

## Technology Stack

| Area | Technologies |
|---|---|
| Frontend prototype | React, Vite, JavaScript |
| Backend prototype | Python, FastAPI, Pydantic |
| Research pipeline | Python, pandas, structured experiment logs |
| Planned evaluation | LLM APIs and open-weight models, adversarial testing, statistical calibration |
| Data formats | JSON, Parquet, versioned experiment configurations |

## Repository Structure

```text
Survey-detection/
├── backend/
│   └── main.py          # FastAPI submission service
└── frontend/
    ├── public/
    ├── src/
    │   └── App.jsx      # Survey interface and submission workflow
    └── package.json
```

## Run the Current Prototype

### Backend

```bash
cd backend
python -m venv .venv
```

Activate the environment and install the current backend dependencies:

```bash
pip install fastapi uvicorn pydantic
uvicorn main:app --reload --port 8000
```

The API will be available at `http://127.0.0.1:8000`.

### Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local Vite address shown in the terminal, typically `http://localhost:5173`.

## Privacy and Responsible Use

This repository is currently a research prototype. Do not collect responses from real participants without the appropriate consent and human-subjects review. Behavioral telemetry should store timings and counts rather than the characters a participant types. Detection signals should support human review and should not be treated as proof of misconduct on their own.

## Current Limitations

- The checked-in application is an early survey collection prototype, not the completed adaptive router.
- Response storage is local JSON and is not suitable for production or sensitive data.
- Final detection thresholds and evaluation results are still under development.
- Visual or screenshot-only attack evaluation is not included in the current implementation.

## Roadmap

- Add standardized survey and quiz schemas
- Integrate content and behavioral detection mechanisms
- Build the failure-mode map from human and AI outcomes
- Connect the adaptive router to the survey interface
- Compare the router with fixed-mechanism baselines
- Publish calibrated results, limitations, and fairness analysis

## Team

This is an ongoing Arizona State University CSE 576 research project developed by a three-person team with faculty and mentor guidance.

