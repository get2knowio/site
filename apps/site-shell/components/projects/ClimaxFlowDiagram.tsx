/**
 * Responsive architecture flow diagram for the CLImax project.
 * Replaces the ASCII art that broke due to monospace font misalignment.
 */

interface ClimaxFlowDiagramProps {
  colorVar: string;
}

function Box({
  title,
  subtitle,
  colorVar,
  accent,
}: {
  title: string;
  subtitle: string;
  colorVar: string;
  accent?: boolean;
}) {
  return (
    <div
      className="relative rounded-lg px-4 py-3 text-center min-w-0"
      style={{
        backgroundColor: accent
          ? `hsl(var(--${colorVar}) / 0.08)`
          : 'hsl(var(--g2k-bg-raised))',
        border: accent
          ? `1.5px solid hsl(var(--${colorVar}) / 0.35)`
          : '1.5px solid hsl(var(--g2k-border))',
        boxShadow: 'var(--g2k-shadow-sm)',
      }}
    >
      <div
        className="text-sm font-semibold font-mono"
        style={{ color: accent ? `hsl(var(--${colorVar}))` : 'hsl(var(--g2k-fg))' }}
      >
        {title}
      </div>
      <div className="text-xs text-g2k-fg-muted mt-0.5 leading-snug">{subtitle}</div>
    </div>
  );
}

function Arrow({ label, colorVar }: { label: string; colorVar: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 shrink-0 px-1">
      <span
        className="text-[10px] font-mono font-medium uppercase tracking-wider"
        style={{ color: `hsl(var(--${colorVar}) / 0.6)` }}
      >
        {label}
      </span>
      <div className="flex items-center gap-0">
        {/* Forward arrow */}
        <svg width="48" height="16" viewBox="0 0 48 16" className="block">
          <line
            x1="0" y1="5" x2="44" y2="5"
            stroke={`hsl(var(--${colorVar}) / 0.4)`}
            strokeWidth="1.5"
          />
          <polygon
            points="42,1 48,5 42,9"
            fill={`hsl(var(--${colorVar}) / 0.4)`}
          />
          {/* Return arrow */}
          <line
            x1="48" y1="11" x2="4" y2="11"
            stroke={`hsl(var(--${colorVar}) / 0.4)`}
            strokeWidth="1.5"
          />
          <polygon
            points="6,7 0,11 6,15"
            fill={`hsl(var(--${colorVar}) / 0.4)`}
          />
        </svg>
      </div>
    </div>
  );
}

function VerticalArrow({ colorVar }: { colorVar: string }) {
  return (
    <div className="flex justify-center">
      <svg width="16" height="24" viewBox="0 0 16 24" className="block">
        <line
          x1="8" y1="24" x2="8" y2="4"
          stroke={`hsl(var(--${colorVar}) / 0.4)`}
          strokeWidth="1.5"
        />
        <polygon
          points="4,6 8,0 12,6"
          fill={`hsl(var(--${colorVar}) / 0.4)`}
        />
      </svg>
    </div>
  );
}

export default function ClimaxFlowDiagram({ colorVar }: ClimaxFlowDiagramProps) {
  return (
    <div
      className="my-6 rounded-xl p-5 sm:p-6"
      style={{
        backgroundColor: 'hsl(var(--g2k-bg-sunken))',
        border: '1.5px solid hsl(var(--g2k-border))',
        boxShadow: 'var(--g2k-shadow-inset-deep)',
      }}
    >
      {/* Top row: 3 boxes with arrows */}
      <div className="flex items-center justify-center gap-1 sm:gap-2">
        <div className="flex-1 max-w-[160px]">
          <Box
            title="LLM Client"
            subtitle="Claude, Cursor, etc."
            colorVar={colorVar}
          />
        </div>

        <Arrow label="MCP" colorVar={colorVar} />

        <div className="flex-1 max-w-[180px]">
          <Box
            title="CLImax"
            subtitle="reads YAML, runs commands"
            colorVar={colorVar}
            accent
          />
        </div>

        <Arrow label="subprocess" colorVar={colorVar} />

        <div className="flex-1 max-w-[160px]">
          <Box
            title="Your CLI"
            subtitle="git, claude, docker…"
            colorVar={colorVar}
          />
        </div>
      </div>

      {/* Vertical arrows from config files to CLImax */}
      <div className="flex justify-center gap-8 sm:gap-12 mt-2">
        <VerticalArrow colorVar={colorVar} />
        <VerticalArrow colorVar={colorVar} />
      </div>

      {/* Bottom row: config files */}
      <div className="flex justify-center gap-3 sm:gap-4 mt-2">
        <div className="w-[130px]">
          <Box
            title="config.yaml"
            subtitle="tool definitions"
            colorVar={colorVar}
          />
        </div>
        <div className="w-[130px]">
          <Box
            title="policy.yaml"
            subtitle="optional constraints"
            colorVar={colorVar}
          />
        </div>
      </div>
    </div>
  );
}
