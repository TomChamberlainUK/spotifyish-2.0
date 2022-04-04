type Props = {
  condition: any,
  caseHandlers: {
    conditionCase: any,
    handler: JSX.Element
  }[],
  defaultHandler: JSX.Element
}

function Switch({ condition, caseHandlers, defaultHandler }: Props) {
  for (const { conditionCase, handler } of caseHandlers) {
    if (condition === conditionCase) {
      return handler;
    }
  }
  return defaultHandler;
}

export default Switch;