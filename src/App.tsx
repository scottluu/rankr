import {useEffect, useState} from 'react'
import './App.css'
import {ReactSortable} from "react-sortablejs";
import {Button, Input} from "@mui/joy";
import {useSearchParams} from "react-router-dom";


type ItemType = {
    id: number;
    name: string;
}

const App = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, setState] = useState<ItemType[]>(JSON.parse(atob(searchParams.get("state") || btoa("[]"))));
    const [url, setUrl] = useState("")

    useEffect(() => {
        setSearchParams({state: btoa(JSON.stringify(state))})
    }, [setSearchParams, state])

    return (
        <>
            <ReactSortable list={state} setList={setState}>
                {state.map((item) => (
                    <img style={{width: "250px"}} key={item.id} src={item.name} alt={""}/>
                ))}
            </ReactSortable>
            <Input
                placeholder={"Image URL"}
                value={url}
                onChange={event => setUrl(event.target.value)}
            />
            <Button
                onClick={() => {
                    setState(prevState => [...prevState, {id: prevState.length, name: url}])
                    setUrl("")
                }}
            >Add Image</Button>
        </>
    );
};

export default App