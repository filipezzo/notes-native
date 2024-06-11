export function getNextStep(step) {
  const nextStep =
    step === "Para fazer"
      ? "Em andamento"
      : step === "Em andamento"
      ? "Pronto"
      : "Para fazer";

  return nextStep;
}
