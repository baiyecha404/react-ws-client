import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {
    Typography, CardHeader, Box, IconButton, Card, Grid,
    TextField, Switch, Tooltip
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryBox from './HistoryBox';

export default function ConnectBox(props) {
    const { number, boxes, setBoxes } = props;
    const [socketUrl, setSocketUrl] = useState('');
    const [inputUrl, setInputUrl] = useState('');
    const [message, setMessage] = useState('');
    const [connected, setConnected] = useState(false);
    const [history, setHistory] = useState([]);

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {}, connected);


    useEffect(() => {
        if (lastMessage !== null && message !== "") {
            let data = { "sent": message, "received": lastMessage }
            setHistory((prev) => prev.concat(data));
        }
    }, [lastMessage, setHistory]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    const handleStatus = (status) => {
        switch (status) {
            case 'Connecting':
                return "warning"
            case 'Open':
                return "success"
            case 'Closing':
                return "warning"
            case 'Closed':
                return "error"
            case 'Uninstantiated':
                return "error"
            default:
                break;
        }
    }

    const handleClickChangeSocketUrl = useCallback(
        () => {
            setSocketUrl(inputUrl);
            setConnected(true)
        },
        [inputUrl]
    );

    const handleClickSendMessage = useCallback(
        () => sendMessage(message),
        [message]
    );

    const handleSocketConnected = (e) => {
        if (!connected) {
            setMessage("")
        }
        setConnected(!connected);
    }

    const handleBoxRemoved = (e) => {
        setBoxes(boxes.filter(box => box !== number))
    }

    return (
        <>
            <Grid item xs={2}
                sm={10}
                md={6}>
                <Card
                    sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'space-between',
                        height: 300
                    }}
                >
                    <CardHeader
                        sx={{
                            height: 80
                        }}
                        action={
                            <Box sx={{ m: 1 }}>
                                <Tooltip title="connect or disconnect">
                                    <Switch checked={connected} onChange={handleSocketConnected} />
                                </Tooltip>
                                <Tooltip title="remove connect box">
                                    <IconButton onClick={handleBoxRemoved}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        }
                        title={
                            <Box sx={{
                                m: 1, display: 'flex',
                                alignItems: 'flex-start',
                            }}>
                                <Box>
                                    <CircleIcon color={handleStatus(connectionStatus)} sx={{ height: 22, width: 12 }} />
                                </Box>
                                <Box>
                                    <Typography sx={{ ml: 1 }} variant='body1'>{socketUrl === "" ? "TO BE CONFIGURED" : socketUrl}</Typography>
                                </Box>
                            </Box>
                        }
                    />
                    <Box sx={{ mt: 3, m: 3 }}>
                        <TextField
                            fullWidth
                            label="Url"
                            value={inputUrl}
                            onChange={e => setInputUrl(e.target.value)}
                            InputProps={{
                                endAdornment: <IconButton color="primary"
                                    onClick={handleClickChangeSocketUrl}><AddIcon /></IconButton>
                            }}
                        ></TextField>
                        <TextField
                            fullWidth
                            label="Message"
                            sx={{ my: 3 }}
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            InputProps={{
                                endAdornment: <IconButton color="primary"
                                    disabled={readyState !== ReadyState.OPEN}
                                    onClick={handleClickSendMessage}><SendIcon /></IconButton>
                            }}
                        ></TextField>
                    </Box>
                </Card>
            </Grid>
            <HistoryBox history={history} />
        </>
    )
}