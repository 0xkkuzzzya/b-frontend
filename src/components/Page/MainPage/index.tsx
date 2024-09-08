import styled from "styled-components";
import BytecoinLogo from '../../../assets/BytecoinLogo.png'
import { NavigationBlock } from "./NavigationBlock";
import { MinerBlock } from "./MinerBlock";
import { useEffect } from "react";
import { useMinersInfo, useProtocolInfo } from "../../../store/useProtocol";
import { formatCash, toFixed } from "../../../utils/utils";

const Container = styled.div`
    width: 85%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const MainInfoBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 4px;
`

const MainText = styled.a`
    color: #fff;
    font-weight: 600;
    font-size: 30px;
`

const Amount = styled.a`
    color: #fff;
    font-weight: 500;
    font-size: 30px;
`

const AmountDescription = styled.a`
    color: #adabac;
    font-weight: 500;
    font-size: 14px;
`

const Logo = styled.img`
    width: 75px;
    height: 75px;
`

const MainInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`


export const MainPage = () => {

    useEffect(() => {
        window.Telegram.WebApp.BackButton.hide()
    }, [])

    const [miner_info, setMinerInfo] = useMinersInfo();
    const [protocol_info, setProtocolInfo] = useProtocolInfo();
    
    let mined_value = ((35008.55 / protocol_info.epoch) / protocol_info.miners_nft_count) * miner_info.miners_amount

    return (
        <>
            <Container>
                <MainInfo>
                    <MainInfoBlock>
                        <MainText>Bytecoin</MainText>
                        <Amount>{miner_info.bytecoins_amount < 1000 ? toFixed(miner_info.bytecoins_amount, 3) : formatCash(miner_info.bytecoins_amount)} BYTE</Amount>
                        {protocol_info.epoch == 0 || protocol_info.miners_nft_count == 0 || miner_info.battery_amount == 0 || miner_info.miners_amount == 0 ?
                            <> <AmountDescription> 0 Mined today • {miner_info.miners_amount} NFT Miner</AmountDescription> </> :
                            <AmountDescription>
                                {
                                    isNaN(mined_value) ? 0 : formatCash(mined_value)
                                } Mined today • {miner_info.miners_amount} NFT Miner
                            </AmountDescription>
                        }
                    </MainInfoBlock>
                    <Logo loading="lazy" src={BytecoinLogo} />
                </MainInfo>
                <NavigationBlock />
            </Container>
            <MinerBlock />
        </>
    )
}