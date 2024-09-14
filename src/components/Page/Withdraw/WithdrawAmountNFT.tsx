import styled from "styled-components";
import Laptop from '../../../assets/laptop.webp'
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMinersInfo } from "../../../store/useProtocol";
import { SendTransactionRequest, useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { BytecoinProtocolAddress, BytecoinApiURL } from "../../../utils/const";
import { defaultSize, getInputSize } from "../../../store/useInputSize";


export interface InputSize {
    size: number;
    width: number;
}

const Container = styled.div`
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const NameContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 30px;
`

const Logo = styled.img`
    width: 25px;
    height: 25px;
    margin-left: 2px;
`

const Name = styled.a`
    color: #fff;
    font-size: 15px;
    font-weight: 500;
    margin-left: 10px;
`

const AmountContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`

const Input = styled.input <{ anim: string }>`
    min-width: 32px;
    height: 60px;
    font-size: 50px;
    font-weight: 500;
    color: #fff;
    background: transparent;
    padding: 0;
    animation: ${(props: { anim: any; }) => props.anim};
    @keyframes shake {
        10%, 90% {
            transform: translateX(-0.5px);
        }
        20%, 80% {
            transform: translateX(1px);
        }
        30%, 50%, 70% {
            transform: translateX(-2px);
        }
        40%, 60% {
            transform: translateX(2px);
        }
    }
`

const WithdrawNameToken = styled.a`
    color: #a5a5a5;
    font-size: 38px;
    font-weight: 500;
    margin-top: 7px;
    margin-left: 5px;
`

const WithdrawNameTokenError = styled.a`
    color: #ef5b5b;
    font-size: 38px;
    font-weight: 500;
    margin-top: 7px;
    margin-left: 5px;
`


const InputContainer = styled.label`
    display: flex;
    align-items: center;
    margin-top: -5px;
`

const AmountOnBalance = styled.a`
    color: #a5a5a5;
    font-size: 15px;
    font-weight: 500;
    margin-top: 10px;
    margin-left: 2px;
`

const ButtonContainer = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 30px;
`

const NonActiveConfirm = styled.button`
    width: 90%;
    height: 45px;
    border-radius: 10px;
    background-color: #2f2f2f;
    color: #555;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
`

const ActiveConfirm = styled.button`
    width: 90%;
    height: 45px;
    border-radius: 10px;
    background-color: #0098EA;
    color: #fff;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
`

const Links = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
`

export const WithdrawAmountNFT = () => {
    const userFriendlyAddress = useTonAddress();
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();
    const [miner_info, setMinerInfo] = useMinersInfo();
    const [tonConnectUI, setOptions] = useTonConnectUI();

    useEffect(() => {
        window.Telegram.WebApp.BackButton.show()
        window.Telegram.WebApp.BackButton.onClick(() => navigate(-1))
    }, [])

    const WithdrawalNFT = (amount: number) => {
        let parsed_amount = (0.12 * 10 ** 9)
        let myTransaction: SendTransactionRequest = {
            validUntil: Math.floor(Date.now() / 1000) + 600,
            messages: []
        }
        for (let index = 0; index < amount; index++) {
            myTransaction.messages.push({
                address: BytecoinProtocolAddress,
                amount: parsed_amount.toString(),
                payload: "te6cckEBAQEADgAAGAAAAZAAAAAAAAAAAOWSCPQ="
            })
        }

        return myTransaction
    }

    const WithdrawalNFTAction = async (amount: number) => {
        let tx = WithdrawalNFT(amount)
        let result = tonConnectUI.sendTransaction(tx);
        result.then((res) => {
            navigate("/SuccessWithdrawNFT");
        })
    }

    const refBlock = useRef<HTMLLabelElement>(null);

    const [fontSize, setFontSize] = useState<InputSize>(defaultSize);

    useLayoutEffect(() => {
        if (refBlock.current) {
            setFontSize(getInputSize(amount, refBlock.current));
        }
        
    }, [refBlock.current, amount]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s/g, '');

        if (value.length <= 4) {
            if (value == '0' && amount != '0') {
                setAmount(value);
            } else if (value != '0' && !value.startsWith('0')) {
                const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                setAmount(formattedValue);
            }
        }
    };

    const handleChangeError = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s/g, '');

        if (value.length <= 4) {
            if (value == '0' && amount != '0') {
                setAmount(value);
            } else if (value != '0' && !value.startsWith('0')) {
                setAmount(value);
            }
        }
    };

    return (
        <>
            <Container>
                <div style={{ width: "100%" }}>
                    <NameContainer>
                        <Logo loading="lazy" src={Laptop} />
                        <Name>Send to Your wallet</Name>
                    </NameContainer>
                    <AmountContainer>
                        <InputContainer ref={refBlock}>
                            {Number(amount) > miner_info.miners_amount ?
                                <>
                                    <Input
                                        value={amount}
                                        style={{ width: `${fontSize.width}px`, color: "#ef5b5b" }}
                                        onChange={handleChangeError}
                                        inputMode='numeric'
                                        pattern="[0-9]*"
                                        placeholder="0"
                                        anim="shake 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) both"
                                    ></Input>
                                    <WithdrawNameTokenError>NFT</WithdrawNameTokenError>
                                </>
                                :
                                <>
                                    <Input 
                                    value={amount} 
                                    style={{ width: `${fontSize.width}px` }} 
                                    onChange={handleChange} 
                                    inputMode='numeric' 
                                    pattern="[0-9]*" 
                                    placeholder="0" 
                                    anim=""
                                    ></Input>
                                    <WithdrawNameToken>NFT</WithdrawNameToken>
                                </>
                            }
                        </InputContainer>
                        <AmountOnBalance>{miner_info.miners_amount} NFT on balance</AmountOnBalance>
                    </AmountContainer>
                </div>
            </Container>
            <ButtonContainer>
                {
                    amount != "" && Number(amount) != 0 ?
                        Number(amount) <= 4 ?
                            Number(amount) <= miner_info.miners_amount ?
                                <Links><ActiveConfirm onClick={() => WithdrawalNFTAction(Number(amount))}>CONTINUE</ActiveConfirm></Links>
                                : <NonActiveConfirm>Not enough funds</NonActiveConfirm>
                            : <NonActiveConfirm>No more than 4 NFTs per attempt</NonActiveConfirm>
                        : <NonActiveConfirm>CONTINUE</NonActiveConfirm>
                }
            </ButtonContainer>
        </>
    )
}