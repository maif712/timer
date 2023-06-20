import { useEffect, useState } from "react"


export default function App() {

    const [isPlayerOne, setIsPlayerOne] = useState(false)
    const [isPlayerTwo, setIsPlayerTwo] = useState(false)

    const [mySelectInput, setMySelectInput] = useState("15")

    const [playerOneMinute, setPlayerOneMinute] = useState()
    const [playerOneSecond, setPlayerOneSecond] = useState(0)

    const [playerTwoMinute, setPlayerTwoMniute] = useState()
    const [PlayerTwoSecond, setPlayerTwoSecond] = useState(0)

    const [isStart, setIsStart] = useState(true)

    useEffect(() => {

        let myTimer;
        if (isPlayerOne) {
            myTimer = setInterval(() => {
                setPlayerOneSecond(x => x - 1)
            }, 1000);
        }

        if (isPlayerOne && playerOneSecond == 0) {
            setPlayerOneMinute(x => x - 1)
            setPlayerOneSecond(59)
        }

        if (playerOneMinute == 0) {
            alert("Done")
            clearInterval(myTimer)
            setPlayerOneSecond(0)
        }

        return () => {
            clearInterval(myTimer)
        }
    }, [isPlayerOne, playerOneSecond])

    useEffect(() => {
        let test;

        if (isPlayerTwo) {
            test = setInterval(() => {
                setPlayerTwoSecond(x => x - 1)
            }, 1000);
        }

        if (isPlayerTwo && PlayerTwoSecond == 0) {
            setPlayerTwoMniute(x => x - 1)
            setPlayerTwoSecond(59)
        }

        if (playerTwoMinute == 0) {
            alert("Done")
            clearInterval(test)
            setPlayerOneSecond(0)
        }

        return () => {
            clearInterval(test)
        }
    }, [isPlayerTwo])


    const setMyTimer = () => {
        setIsStart(false)
        setIsPlayerOne(true)
    }

    const handleStopTimer = () => {
        setIsPlayerOne(false)
        setIsPlayerTwo(false)
        setIsStart(true)
    }

    function SetSecondTimer() {
        setPlayerOneSecond(0)
        setPlayerTwoSecond(0)
    }

    useEffect(() => {
        SetSecondTimer()
        if (mySelectInput == "10") {
            setPlayerOneMinute(10)
            setPlayerTwoMniute(10)
        }
        else if (mySelectInput == "5") {
            setPlayerOneMinute(5)
            setPlayerTwoMniute(5)
        }
        else if(mySelectInput == "15")
        {
            setPlayerOneMinute(15)
            setPlayerTwoMniute(15)
        }
    }, [mySelectInput])



    const handlePlayerOneTimer = () => {
        setIsPlayerTwo(true)
        setIsPlayerOne(false)
    }

    const handlePlayerTwoTimer = () => {
        setIsPlayerOne(true)
        setIsPlayerTwo(false)
    }


    return (
        <div className="my-container bg-blue-400 p-3 text-3xl rounded-lg shadow-md flex flex-col gap-7 my-10">
            <select value={mySelectInput} onChange={e => setMySelectInput(e.target.value)} name="" id="">
                <option value="15">15 min</option>
                <option value="10">10 min</option>
                <option value="5">5 min</option>
            </select>
            <div className="flex flex-col gap-4 min-[376px]:flex-row  min-[376px]:grid min-[376px]:grid-cols-2">
                <div className="bg-white p-2 flex flex-col gap-2 rounded-md shadow-md">
                    <div className="flex flex-col gap-2 justify-center items-center">
                        {/* <h2 className="text-white font-bold uppercase rounded-md p-2 bg-black">White</h2> */}
                        <p className="p-2 bg-green-600 text-white rounded-md shadow-md w-[100px] text-center">{playerOneMinute < 10 ? `0${playerOneMinute}` : playerOneMinute}:{playerOneSecond < 10 ? `0${playerOneSecond}` : playerOneSecond}</p>
                    </div>
                    <button className="bg-[#7fa650] hover:bg-[#95bb4a] text-white font-semibold rounded-md p-6 text-lg shadow-md" onClick={handlePlayerOneTimer}>White Timer</button>
                </div>
                <div className="bg-[#2b2825] p-2 flex flex-col gap-2 rounded-md shadow-md">
                    <div className="flex flex-col gap-2 justify-center items-center">
                        {/* <h2 className="bg-white text-black uppercase p-2 rounded-md font-bold">Black</h2> */}
                        <p className="p-2 bg-green-600 text-white rounded-md shadow-md w-[100px] text-center">{playerTwoMinute < 10 ? `0${playerTwoMinute}` : playerTwoMinute}:{PlayerTwoSecond < 10 ? `0${PlayerTwoSecond}` : PlayerTwoSecond}</p>
                    </div>
                    <button className="bg-[#7fa650] hover:bg-[#95bb4a] text-white font-semibold rounded-md p-6 text-lg shadow-md" onClick={handlePlayerTwoTimer}>Black Timer</button>
                </div>
            </div>


            <button className={`bg-green-500 text-white p-2 rounded-md transition-all duration-200 hover:shadow-md ${!isStart ? `bg-red-500` : ``}`} onClick={isStart ? setMyTimer : handleStopTimer}>{isStart ? "Start" : "Stop"}</button>
        </div>
    )
}