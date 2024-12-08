<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">AI Agent - Platforms & Tools - exercise</p>

## Description

This repository contains the sample code for the AI Agent - Platforms & Tools - exercise.

It is a NestJS project that builds the following:
- A REST API that serves a few endpoints to handle input for the AI Agent
  - only the `/api/v1/input/manual` endpoint is implemented
  - a few others are present there as placeholders, commented out, just to show the potential structure
- A router library that is tasked with the routing (logic) for handling the given input (`libs/router`)
  - the implementation here is very basic, just to show the potential structure
  - for the exercise, we only handle classifying the intent of the input (what platform or tool to use), if any
- A 'skills' library that contains all the platforms and tools available to the AI Agent (`libs/skills`)
  - the platforms and tools are mocked, they only log a message on execution
- An LLM library for interactions with OpenAI, used by the router (`libs/openai`)
  - the only thing implemented here is the classification of the intent from the input

## Project setup

Create an `.env` file in the project root (check the `.env.template` file for an example),
where you need to set the following environment variables:
- `OPENAI_API_KEY`: the API key to be used for OpenAI interactions

## Compile and run the project

The easiest way to run the project is to use the provided Makefile,
which contains the commands to run the backend in Docker.

To run the backend, use the following command:
```bash
make backend-start
```

To stop the backend, use the following command:
```bash
make backend-stop
```

## Skills library - implementation details

The `skills` library contains the platforms and tools available to the AI Agent.
It is built using the adapter pattern, with the different platforms and tools being used as plugins in the code.

Let's take a look at an example of a platform skill implementation:
```typescript
@RegisterSkill()
export class PlatformXYZAdapter implements Skill {
  constructor() {}

  execute(): void {}
}
```

The `Skill` interface is used to define the adapter, such that all the platforms and tools have the same structure.

The `@RegisterSkill` decorator is used to register the platform or tool in the skill library, registration which runs
at startup automatically.
This is achieved using the `loadSkills` function, which dynamically imports all the skills when the application starts.

Using this pattern, scaling the AI Agent with new platforms and tools is as easy as adding a new file in the
`skills` library, without affecting any other part of the code.
The same can be said for removing a platform or tool.

The `WhatsApp` platform (found in `libs/skills/src/adapters/platforms/whatsapp.adapter.ts`) is implemented,
but commented out.
It can be uncommented and used as a reference for implementing new skills.
Check the logs at application startup to see how the registration of the `skills` changes automatically.

## Usage examples

The only implemented endpoint is the `/api/v1/input/manual` endpoint.
It can be used to send manual input to the AI Agent, which will classify the intent of the input,
and route it to the correct platform or tool, if any.

By making calls to this endpoint, you will be able to see what happens within the logs of the application.

### Example requests

- Should trigger the Crypto tool to execute
```bash
curl -X POST http://localhost:3000/api/v1/input/manual -H "Content-Type: application/json" -d '{"command": "Execute a crypto exchange tonight"}'
```

- Should trigger the Twitter platform to execute
```bash
curl -X POST http://localhost:3000/api/v1/input/manual -H "Content-Type: application/json" -d '{"command": "Post a message on Twitter"}'
```

- Should not trigger any platform or tool
```bash
curl -X POST http://localhost:3000/api/v1/input/manual -H "Content-Type: application/json" -d '{"command": "This is a random command"}'
```