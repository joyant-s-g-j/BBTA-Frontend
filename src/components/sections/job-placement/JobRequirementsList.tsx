interface JobRequirementsListProps {
  requirements: string[];
}

export function JobRequirementsList({ requirements }: JobRequirementsListProps) {
  if (!requirements.length) return null;

  return (
    <div>
      <h4 className="font-semibold mb-2">Requirements</h4>
      <ul className="space-y-2">
        {requirements.map((req, index) => (
          <li
            key={`${req}-${index}`}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
            {req}
          </li>
        ))}
      </ul>
    </div>
  );
}
