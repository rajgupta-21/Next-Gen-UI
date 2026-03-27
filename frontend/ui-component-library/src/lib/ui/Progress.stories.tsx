// Progress.stories.tsx

import Progress from "./Progress";

export const ProgressStories = {
  title: "UI/Progress",
  component: Progress,
};

export const Default = () => <Progress value={65} />;

export const WithLabel = () => <Progress value={75} showLabel />;

export const Gradient = () => (
  <Progress value={80} variant="gradient" showLabel />
);

export const Striped = () => (
  <Progress value={60} variant="striped" showLabel />
);

export const StripedAnimated = () => (
  <Progress value={70} variant="striped" animated showLabel />
);

export const Small = () => <Progress value={65} size="sm" showLabel />;

export const Medium = () => <Progress value={65} size="md" showLabel />;

export const Large = () => <Progress value={65} size="lg" showLabel />;

export const CustomTheme = () => (
  <Progress
    value={85}
    variant="gradient"
    showLabel
    theme={{
      primary: "#10b981",
      primary600: "#059669",
    }}
  />
);

export const Complete = () => (
  <Progress value={100} variant="gradient" showLabel />
);

export const Empty = () => <Progress value={0} showLabel />;

export const AllVariants = () => (
  <div className="space-y-6 p-4">
    <div>
      <p className="text-sm mb-2">Default</p>
      <Progress value={45} showLabel />
    </div>
    <div>
      <p className="text-sm mb-2">Gradient</p>
      <Progress value={65} variant="gradient" showLabel />
    </div>
    <div>
      <p className="text-sm mb-2">Striped</p>
      <Progress value={85} variant="striped" showLabel />
    </div>
    <div>
      <p className="text-sm mb-2">Striped Animated</p>
      <Progress value={75} variant="striped" animated showLabel />
    </div>
  </div>
);
