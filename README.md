# n8n-nodes-transkriptor

This is an n8n community node for [Transkriptor](https://transkriptor.com) — an AI-powered transcription service supporting 100+ languages with speaker recognition, timestamps, and automated summaries.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Features

This node allows you to automate the following operations:

### Transcript
- **Get Many** — Retrieve a list of your transcription files
- **Get** — Retrieve transcription content by order ID
- **Export** — Export a transcription in TXT, SRT, PDF, or DOCX formats

### Transcription
- **Transcribe Meeting** — Send a bot to join and transcribe Google Meet, Microsoft Teams, or Zoom meetings
- **Upload File** — Upload an audio or video file for transcription

### Webhook
- **Create** — Register a webhook to receive transcription completion notifications
- **Get Many** — List all registered webhooks
- **Get** — Retrieve a specific webhook's details
- **Update** — Update webhook settings
- **Delete** — Remove a webhook

## Credentials

You need a Transkriptor API key to use this node:

1. Sign up at [transkriptor.com](https://transkriptor.com)
2. Navigate to your [API Key settings](https://app.transkriptor.com/app/api-key)
3. Copy your API key
4. In n8n, create new credentials of type **Transkriptor API** and paste your key

For more details, see the [Authentication documentation](https://developer.transkriptor.com/docs/authentication).

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Resources

- [Transkriptor Developer Documentation](https://developer.transkriptor.com/docs)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE.md)
