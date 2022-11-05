import styled from "styled-components";

// max-width limita a largura a 500px por exemplo, não bota a largura de algo como 500px, é diferente, pode ser menor mas não pode ser maior.
// flex: 1 para o elemento pegar a área geral disponível para ele.
// outline: 0 para tirar a borda padrão dos inputs.
// tratando de um input, &:focus quando o campo estiver focado, ou seja, o cursor para escrever está no input após o usuário clicar no input para preencher algo nele, algo é feito dai quando estiver ocorrendo esse caso de foco do input. Botando um transition: all ease 0.4s; no input, ele faz uma transição/efeito mais suave, demorando 0.4s para aplicar o estilo do &:focus definido para o input.
export const PageArea = styled.div`

    form {
        background-color: #FFF;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 0px 0px 3px #999;

        .area {
            display: flex;
            align-items: center;
            padding: 10px;
            max-width: 500px;

            .area--title {
                width: 200px;
                text-align: right;
                padding-right: 20px;
                font-weight: bold;
                font-size: 14px;
            }

            .area--input {
                flex: 1;

                input {
                    width: 100%;
                    font-size: 14px;
                    padding: 5px;
                    border: 1px solid #DDD;
                    border-radius: 3px;
                    outline: 0;
                    transition: all ease 0.4s;
                
                    &:focus {
                        border: 1px solid #333;
                        color: #333;
                    }
                }

                button {
                    background-color: #0089FF;
                    border: 0;
                    outline: 0;
                    padding: 5px 10px;
                    border-radius: 4px;
                    color: #FFF;
                    font-size: 15px;
                    cursor: pointer;

                    &:hover {
                        background-color: #006FCE;
                    }
                }
            }
        }
    }

    @media (max-width: 600px) {
        form {

            .area {
                flex-direction: column;
                
                .area--title {
                    width: 100%;
                    /* alinhamento do texto a esquerda */
                    text-align: left;
                    margin-bottom: 10px;
                }

                .area--input {
                    width: 100%;

                    button {
                        width: 100%;
                        padding: 10px;
                    }
                }
            }
        }
    }
`;