import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [formula, setFormula] = useState("");

  const buttonsHandler = (event) => {
    const value = event.target.value;

    if (formula.indexOf("=") >= 0) {
      if (!isNaN(value)) {
        setDisplay(value);
        setFormula(value);
        return;
      } else if (value === ".") {
        setDisplay("0.");
        setFormula("0.");
        return;
      } else {
        setFormula(() => display);
      }
    }

    if (value === "AC") {
      setDisplay("");
      setFormula("");
    } else if (value === "=") {
      let formula2 = "";
      if (isNaN(formula.at(-2)) && isNaN(formula.at(-1))) {
        formula2 = formula.slice(0, -2);
      } else if (isNaN(formula.at(-1))) {
        formula2 = formula.slice(0, -1);
      } else {
        formula2 = formula;
      }
      const result = eval(formula2.replaceAll("x", "*"))?.toString();
      setDisplay(result);
      setFormula(formula2 + "=" + result);
    } else if (display.indexOf(".") >= 0 && value === ".") {
      return;
    } else if (formula.length === 0) {
      if (!isNaN(value) || value === "-" || value === "+") {
        setDisplay(value);
        setFormula(value);
      } else if (value === ".") {
        setDisplay("0.");
        setFormula("0.");
      }
    } else if (formula.length === 1) {
      if (formula === "0" && !isNaN(value) && value !== 0) {
        setDisplay(value);
        setFormula(value);
      } else if (!isNaN(formula)) {
        switch (value) {
          case "/":
          case "x":
          case "-":
          case "+":
            setDisplay(value);
            setFormula((prev) => prev + value);
            break;
          default:
            setDisplay((prev) => prev + value);
            setFormula((prev) => prev + value);
        }
      } else if (
        (formula === "-" || formula === "+") &&
        (value === "+" || value === "-")
      ) {
        setDisplay(value);
        setFormula(value);
      } else if (formula === "-" || formula === "+") {
        setDisplay(value);
        setFormula((prev) => prev + value);
      }
    } else if (formula.length >= 2) {
      if (!isNaN(formula.at(-1))) {
        if (!isNaN(value) || value === ".") {
          setDisplay((prev) => prev + value);
          setFormula((prev) => prev + value);
        } else if (!isNaN(value) || value !== ".") {
          setDisplay(value);
          setFormula((prev) => prev + value);
        }
      } else if (
        !isNaN(formula.at(-2)) &&
        isNaN(formula.at(-1)) &&
        formula.at(-1) !== "-"
      ) {
        if (formula.at(-1) === ".") {
          setDisplay((prev) => prev + value);
          setFormula((prev) => prev + value);
        } else if (!isNaN(value) || value === "-") {
          setDisplay(value);
          setFormula((prev) => prev + value);
        } else if (value === ".") {
          setDisplay("0.");
          setFormula((prev) => prev + "0.");
        } else {
          setDisplay(value);
          setFormula((prev) => prev.slice(0, -1) + value);
        }
      } else if (!isNaN(formula.at(-2)) && formula.at(-1) === "-") {
        if (value === "/" || value === "x" || value === "+") {
          setDisplay(value);
          setFormula((prev) => prev.slice(0, -1) + value);
        } else if (value === ".") {
          setDisplay("0.");
          setFormula((prev) => prev + "0.");
        } else {
          setDisplay(value);
          setFormula((prev) => prev + value);
        }
      } else if (formula.at(-2) === "-" && formula.at(-1) === "-") {
        if (!isNaN(value)) {
          setDisplay(value);
          setFormula((prev) => prev + value);
        }
      } else if (isNaN(formula.at(-2)) && isNaN(formula.at(-1))) {
        if (value === ".") {
          setDisplay("0.");
          setFormula((prev) => prev + "0.");
        } else if (isNaN(value)) {
          setDisplay(value);
          setFormula((prev) => prev.slice(0, -2) + value);
        } else {
          setDisplay(value);
          setFormula((prev) => prev + value);
        }
      }
    }
  };

  return (
    <div className="App">
      <div id="app">
        <div className="calculator">
          <div className="formulaScreen">{formula.replaceAll("x", "*")}</div>
          <div className="outputScreen" id="display">
            {display ? display : "0"}
          </div>
          <div onClick={(event) => buttonsHandler(event)}>
            <button
              className="jumbo"
              id="clear"
              value="AC"
              style={{ background: "rgb(172, 57, 57)" }}
            >
              AC
            </button>
            <button
              id="divide"
              value="/"
              style={{ background: "rgb(102, 102, 102)" }}
            >
              /
            </button>
            <button
              id="multiply"
              value="x"
              style={{ background: "rgb(102, 102, 102)" }}
            >
              x
            </button>
            <button id="seven" value="7">
              7
            </button>
            <button id="eight" value="8">
              8
            </button>
            <button id="nine" value="9">
              9
            </button>
            <button
              id="subtract"
              value="-"
              style={{ background: "rgb(102, 102, 102)" }}
            >
              -
            </button>
            <button id="four" value="4">
              4
            </button>
            <button id="five" value="5">
              5
            </button>
            <button id="six" value="6">
              6
            </button>
            <button
              id="add"
              value="+"
              style={{ background: "rgb(102, 102, 102)" }}
            >
              +
            </button>
            <button id="one" value="1">
              1
            </button>
            <button id="two" value="2">
              2
            </button>
            <button id="three" value="3">
              3
            </button>
            <button className="jumbo" id="zero" value="0">
              0
            </button>
            <button id="decimal" value=".">
              .
            </button>
            <button
              id="equals"
              value="="
              style={{
                background: "rgb(0, 68, 102)",
                height: "130px",
                position: "absolute",
                bottom: "5px",
              }}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
