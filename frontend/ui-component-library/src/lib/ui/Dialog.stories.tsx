import { useState } from "react";
import Button from "./Button";
import Dialog from "./Dialog";

export default {
  title: "UI/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
};

export const Default = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: "2rem" }}>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Default Dialog">
        <p>This is a default dialog component.</p>
      </Dialog>
    </div>
  );
};

export const Themed = () => {
  const [open, setOpen] = useState(false);
  const [theme] = useState({
    primary: "#7C3AED",
    primary600: "#5B21B6",
    background: "#F9FAFB",
  });

  return (
    <div style={{ padding: "2rem" }}>
      <Button onClick={() => setOpen(true)}>Open Themed Dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Themed Dialog"
        theme={theme}
      >
        <p>
          This dialog uses a custom color theme passed as props. You can link
          this to your color slider to allow live color changes.
        </p>
      </Dialog>
    </div>
  );
};

export const LongContent = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: "2rem" }}>
      <Button onClick={() => setOpen(true)}>Open Long Dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Scrollable Dialog"
      >
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo
            lectus ac nisl ullamcorper, sit amet tincidunt enim tincidunt.
          </p>
          <p>
            Vivamus tempor, sapien eget dignissim varius, risus justo finibus
            velit, a laoreet mi velit sed urna. Donec facilisis purus nec justo
            porta, in fermentum metus blandit.
          </p>
          <p>
            Morbi non urna eget velit finibus tincidunt. Integer sit amet eros
            ligula. Mauris laoreet lorem at turpis pharetra volutpat.
          </p>
          <p>
            Curabitur tincidunt nibh in lacus tincidunt, sit amet feugiat felis
            suscipit. Proin malesuada nulla vel sagittis vehicula.
          </p>
        </div>
      </Dialog>
    </div>
  );
};
