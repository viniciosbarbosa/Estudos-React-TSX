import React, { useState } from "react";
import { ExpenseProps } from "../../models/interfaces/ExpenseProps/ExpenseProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";

import { FormatMoney } from "../../utils/util";
import {
  ActionsContainer,
  Card,
  CardHeader,
  Container,
  FormContainer,
  FormInput,
} from "../Balace/Balace";

const Expense = ({
  currentBalance,
  currentExpenses,
  emitMovement,
}: ExpenseProps) => {
  const [renderInputForm, setRenderInputForm] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [inputName, setInputName] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleRenderInputForm = () => setRenderInputForm(!false);

  const hideInputForm = () => {
    setRenderInputForm(false);
    setIsFormValid(true);
    setInputName("");
    setInputValue("");
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputName.trim().length === 0 || inputValue.trim().length === 0) {
      setIsFormValid(false);
      return;
    }

    if (currentBalance >= Number(inputValue)) {
      hideInputForm();
      emitMovement({
        name: inputName,
        value: inputValue,
        type: "Output",
      });
    } else {
      setIsFormValid(false);
    }
  };

  const handleInputNameForm = (event: React.FormEvent<HTMLInputElement>) => {
    const eventTarget = event.currentTarget as HTMLInputElement;
    const eventValue = eventTarget.value;
    inputName.trim().length > 0 ? setIsFormValid(true) : setIsFormValid(false);
    setInputName(eventValue);
  };

  const handleInputValueForm = (event: React.FormEvent<HTMLInputElement>) => {
    const eventTarget = event.currentTarget as HTMLInputElement;
    const eventValue = eventTarget.value;
    inputValue.trim().length > 0 ? setIsFormValid(true) : setIsFormValid(false);
    setInputValue(eventValue);
  };

  return (
    <div>
      <Container>
        <Card>
          <CardHeader>
            <FontAwesomeIcon icon={faPercent} color="#e43f4d" size="2x" />
            <h2>Despesas</h2>
          </CardHeader>

          <h3>
            {currentExpenses > 0
              ? FormatMoney(String(currentExpenses))
              : "R$ 0"}
          </h3>

          {!renderInputForm && (
            <Button
              action={handleRenderInputForm}
              title="Saida"
              priority="Output"
              disable={currentBalance === 0}
            />
          )}

          {renderInputForm && (
            <form onSubmit={formSubmitHandler}>
              <FormContainer invalid={!isFormValid}>
                <FormInput
                  type="text"
                  placeholder="Nome"
                  className="expense_input"
                  value={inputName}
                  onChange={handleInputNameForm}
                />

                <FormInput
                  type="text"
                  placeholder="Valor"
                  className="expense_input"
                  value={inputValue}
                  onChange={handleInputValueForm}
                />
              </FormContainer>

              <ActionsContainer>
                <Button
                  title="Cancelar"
                  priority="Output"
                  action={hideInputForm}
                />
                <Button title="Adicionar" type="submit" priority="Input" />
              </ActionsContainer>
            </form>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Expense;
