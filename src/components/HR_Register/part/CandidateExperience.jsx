import { Select, Text } from "@radix-ui/themes";

export default function CandidateExperience({ candidateExperience, setCandidateExperience }) {
  return (
    <div>
      <Select.Root defaultValue={candidateExperience} onValueChange={(e) => setCandidateExperience(e)}>
        <Text as="label" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Expericence</Text>
        <br />
        <Select.Trigger />
        <Select.Content position="popper">
          <Select.Item value="0-1">0-1 year</Select.Item>
          <Select.Item value="1-3">1-3 years</Select.Item>
          <Select.Item value="3-6">3-6 years</Select.Item>
          <Select.Item value="6+">6+ years</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  )
}
