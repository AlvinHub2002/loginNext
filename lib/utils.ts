import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function convertOptionsToShadCNFormat(options: Array<string>) {
  return options.map(option => ({
    label: option,
    value: option
  }));
};

export function getConditionalLogicDependencies(conditionalLogic: any, dependencyValue: any): boolean {
  const { value, operator } = conditionalLogic;

  // Helper function to handle the conditional logic for comparison
  const compareValues = (depValue: any, logicValue: any, op: string): boolean => {
    switch (op) {
      case 'equals':
        return depValue === logicValue;
      case 'not_equals':
        return depValue !== logicValue;
      default:
        return true;
    }
  };
  // If the value is an array, handle accordingly


  if (Array.isArray(dependencyValue)) {

    const isInArray = dependencyValue.includes(value); // Check if "Matilda" exists in the array
    console.log(dependencyValue)
    console.log(Array.isArray(dependencyValue.includes(value)))
    switch (operator) {
      case "equals":
        return isInArray; // true if "Matilda" is in the array
      case "not_equals":
        return !isInArray; // true if "Matilda" is NOT in the array
      default:
        return true;
    }
  } else {
    // If the value is not an array, simply use the compareValues function
    return compareValues(dependencyValue, value, operator);
  }
}

export function conditionalLogicValidator(conditionalLogic: any, watchFields: any) {

  const { fieldId, value, operator } = conditionalLogic;
  const dependencyValue = watchFields[fieldId];

  switch (operator) {
    case "equals":
      return dependencyValue === value;
    case "not_equals":
      return dependencyValue !== value;
    default:
      return true;
  }
}