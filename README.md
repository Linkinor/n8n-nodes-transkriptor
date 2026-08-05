# n8n-nodes-transkriptor

This is an n8n community node. It lets you use [Transkriptor](https://transkriptor.com) in your n8n workflows.

Transkriptor is an AI-powered transcription service that converts audio and video into text. It supports 100+ languages with automatic speaker recognition, timestamps, and multiple export formats.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation) ·
[Operations](#operations) ·
[Credentials](#credentials) ·
[Compatibility](#compatibility) ·
[Usage](#usage) ·
[Resources](#resources) ·
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Transcription

| Operation | Description |
|-----------|-------------|
| **Transcribe From URL** | Transcribe audio/video from a URL — supports YouTube, Google Drive, Dropbox, OneDrive, and any public media URL |
| **Transcribe Meeting** | Send a bot to join and transcribe a live Google Meet, Microsoft Teams, or Zoom meeting |

### Transcript

| Operation | Description |
|-----------|-------------|
| **Get** | Retrieve transcription content by order ID |
| **Get Many** | Retrieve a list of your transcription files |
| **Export** | Export a transcription in various formats (TXT, SRT, PDF, DOCX) |

### Webhook

| Operation | Description |
|-----------|-------------|
| **Create** | Create a new webhook to receive transcription notifications |
| **Get** | Retrieve details of a specific webhook |
| **Get Many** | Retrieve all registered webhooks |
| **Update** | Update an existing webhook's settings |
| **Delete** | Remove a webhook to stop receiving notifications |

## Credentials

To use this node you need a **Transkriptor API key**.

1. Sign up or log in at [transkriptor.com](https://transkriptor.com)
2. Go to **Settings** → **My Account**
3. Copy your **API Key** shown on the page
4. In n8n, go to **Credentials** → **New Credential** → search for **Transkriptor API**
5. Paste your API key and save

The node uses Bearer token authentication. Your credentials are validated automatically when you save them.

## Compatibility

- Minimum n8n version: **1.0.0**
- Tested with n8n **1.x**
- Node.js **18+** required

## Usage

### Transcribe a YouTube video

1. Add the **Transkriptor** node to your workflow
2. Select **Transcription** → **Transcribe From URL**
3. Paste the YouTube URL
4. Choose the language from the dropdown (130+ supported languages)
5. Select the service type: **Standard** or **Subtitle**
6. Execute the node — you'll receive an `order_id` to track the transcription

### Retrieve the transcription result

1. Add another **Transkriptor** node
2. Select **Transcript** → **Get**
3. Use the `order_id` from the previous step
4. The result includes full text with timestamps and speaker labels

### Export to a specific format

1. Add a **Transkriptor** node
2. Select **Transcript** → **Export**
3. Provide the `order_id`
4. Choose your desired format (TXT, SRT, PDF, DOCX)
5. Configure export options like timestamps, speaker labels, and paragraph size

### Transcribe a live meeting

1. Add a **Transkriptor** node
2. Select **Transcription** → **Transcribe Meeting**
3. Paste the meeting URL (Google Meet, Microsoft Teams, or Zoom)
4. Optionally set the bot name, language, and summary template
5. A bot will join the meeting and begin transcribing

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Transkriptor API documentation](https://developer.transkriptor.com/docs)
- [Transkriptor website](https://transkriptor.com)
- [GitHub repository](https://github.com/Linkinor/n8n-nodes-transkriptor)

## Version history

### 0.1.0

Initial release with support for:

- Transcription from URL (YouTube, Google Drive, Dropbox, OneDrive)
- Live meeting transcription (Google Meet, Teams, Zoom)
- Transcript retrieval and export (TXT, SRT, PDF, DOCX)
- Webhook management (Create, Get, Update, Delete)
- 130+ language support via searchable dropdown
- Light and dark theme icons

## License

[MIT](LICENSE)
