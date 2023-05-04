// Define a function that takes a percentage as a parameter and returns a hex color string
function percentageToHexColor(percentage: number) {
  // Convert the percentage to a decimal number between 0 and 1
  const decimal = percentage / 100;

  // Calculate the red and green components of the color by interpolating between 0 and 255
  const red = Math.round(255 * (1 - decimal));
  const green = Math.round(255 * decimal);

  // The blue component is always 0
  const blue = 0;

  // Convert the red, green, and blue components to hexadecimal values
  let redHex = red.toString(16);
  let greenHex = green.toString(16);
  let blueHex = blue.toString(16);

  // Add leading zeros if the hexadecimal values are less than two digits
  if (redHex.length < 2) {
    redHex = `0${redHex}`;
  }
  if (greenHex.length < 2) {
    greenHex = `0${greenHex}`;
  }
  if (blueHex.length < 2) {
    blueHex = `0${blueHex}`;
  }

  // Concatenate the hexadecimal values with a "#" sign at the beginning
  const hexColor = `#${redHex}${greenHex}${blueHex}`;

  // Return the hex color string
  return hexColor;
}

interface IProgressprops {
  value: number;
  max: number;
  min?: number;
}

const LinearProgressBar = (props: IProgressprops) => {
  const { value, max } = props;
  const min = props.min || 0;
  const percentage = ((value - min) / (max - min)) * 100;
  return (
    <div className="h-full w-full">
      <div className="h-4 w-full rounded-full bg-slate-400">
        <div
          className={` h-4 rounded-full`}
          style={{
            width: `${percentage}%`,
            backgroundColor: percentageToHexColor(percentage),
          }}
        />
      </div>
    </div>
  );
};

export default LinearProgressBar;
