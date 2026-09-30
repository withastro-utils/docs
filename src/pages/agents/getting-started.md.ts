import { agentGuide, markdownResponse } from '../../lib/agent-docs';
export function GET() { return markdownResponse(agentGuide()); }
