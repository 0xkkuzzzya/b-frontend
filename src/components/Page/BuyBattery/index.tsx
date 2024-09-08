import styled from "styled-components";
import TonLogo from '../../../assets/TonLogo.svg'
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMinersInfo } from "../../../store/useProtocol";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { defaultSize, getInputSize } from "../../../store/useInputSize";
import { BatteryPrice } from "../../../utils/const";


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
    font-size: 30px;
    font-weight: 500;
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
    animation: ${(props: { anim: any; }) => props .anim};
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
    font-size: 30px;
    font-weight: 500;
    margin-top: 7.5px;
    margin-left: 5px;
`
const WithdrawNameTokenMany = styled.a`
    color: #ef5b5b;
    font-size: 30px;
    font-weight: 500;
    margin-top: 7.5px;
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
    margin-top: 20px;
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
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
`

const Description = styled.a`
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    text-align: left;
`


const LogoInButton = styled.img`
    width: 26px;
    height: 26px;
    margin-top: -2px;
`

const Links = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
`

const BytecoinApiURL = 'https://b-api-theta.vercel.app/api/api/v1'

export const BuyBattery = () => {
    const userFriendlyAddress = useTonAddress();
    const [ amount, setAmount] = useState('');
    const [ miner_info, setMinerInfo ] = useMinersInfo();
    const [ tonConnectUI, setOptions] = useTonConnectUI();
    const navigate = useNavigate();

    useEffect(() => {
        window.Telegram.WebApp.BackButton.show()
        window.Telegram.WebApp.BackButton.onClick(() => navigate(-1))
    }, [])

    const HandleInputAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value)
    };

    const BuyBatteries = (amount: string) => {
        let number_amount = Number(amount)
        let parsed_amount = ((number_amount * BatteryPrice) + 0.05) * 10**9
        const myTransaction = {
            validUntil: Math.floor(Date.now() / 1000) + 300,
            messages: [
                {
                    address: "kQAMlVxzk8FW7FqzP9nFFbxU3cUg-rbaaTSFvUuXMgphavg5",
                    amount: parsed_amount.toFixed(0),
                    //amount: "2000000000",
                    payload: "te6cckEBAQEADgAAGAAAAGQAAAAAAAAAAHSjJwk="
                }
            ]
        }
        return myTransaction
    }

    const BuyBatteriesAction = async (mount: string) => {
        let tx = BuyBatteries(amount)
        let result = tonConnectUI.sendTransaction(tx);
        result.then((res) => {
            navigate("/SuccessBuying");
        })
    }

    const refBlock = useRef<HTMLLabelElement>(null);

    const [fontSize, setFontSize] = useState<InputSize>(defaultSize);

    useLayoutEffect(() => {
        if (refBlock.current) {
            setFontSize(getInputSize(amount, refBlock.current));
        }
        
    }, [refBlock.current, amount]);

    return (
        <>
            <Container>
                <div style={{ width: "100%" }}>
                    <NameContainer>
                        <Name>Buy Batteries</Name>
                    </NameContainer>
                    <AmountContainer>
                        <InputContainer ref={refBlock}>
                            { ((Number(amount) * BatteryPrice > (miner_info.balance / 10**9)) || ( miner_info.miners_amount == 0 )) && (Number(amount) != 0) ? 
                                <> 
                                <Input 
                                value={amount} 
                                style={{ width: `${fontSize.width}px`, color: "#ef5b5b" }} 
                                anim="shake 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) both" 
                                onChange={HandleInputAmount} 
                                inputMode='numeric' 
                                placeholder="0">
                                </Input> 
                                <WithdrawNameTokenMany>batteries</WithdrawNameTokenMany> </> 
                            : 
                                
                                <> 
                                <Input 
                                value={amount} 
                                style={{ width: `${fontSize.width}px` }} 
                                anim='' 
                                onChange={HandleInputAmount} 
                                inputMode='numeric' 
                                placeholder="0">
                                </Input> 
                                <WithdrawNameToken>batteries</WithdrawNameToken> </> 
                            }
                        </InputContainer>
                        <AmountOnBalance>1 Battery ≈ {BatteryPrice} TON</AmountOnBalance>
                    </AmountContainer>
                </div>
            </Container>
            <div style={{width: "85%", marginTop: "20px"}}>
                <Description>
                    Every NFT miner spends 1 battery a block (1 day).<br/>
                    If you don't have enough batteries on your<br/>
                    balance, the NFT miners won't work.
                </Description>
            </div>
            <ButtonContainer>
                {
                    Number(amount) != 0 ? 
                        ((Number(amount) * BatteryPrice) < (miner_info.balance / 10**9)) ?
                            <Links><ActiveConfirm onClick={
                                () => BuyBatteriesAction(amount)
                            }>Buy for {Number(amount) * BatteryPrice} <LogoInButton src={TonLogo}/></ActiveConfirm></Links> 
                        : <NonActiveConfirm>Not enough funds</NonActiveConfirm>
                    : 
                        <NonActiveConfirm>Enter the number of batteries</NonActiveConfirm>}
            </ButtonContainer>
        </>
    )
}