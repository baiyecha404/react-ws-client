import React from "react";
import { List, ListItem, ListItemText, ListSubheader, Grid } from "@mui/material";

export default function HistoryBox(props) {
    const { history } = props;
    return (
        <Grid item xs={8}
            sm={4}
            md={6}>
            {history.length > 0 ? <List sx={{
                marginTop: 10, bgcolor: 'white', overflow: 'auto',
                maxHeight: 300,
            }}>
                {history.map((log) => (
                    <div key={`send-${log.sent}-${Math.random()}`}>
                        <ListSubheader>{log.sent}</ListSubheader>
                        <ListItem key={`received-${log.sent}-${Math.random()}`}>
                            <ListItemText primary={log.received.data} />
                        </ListItem>
                    </div>
                ))}
            </List> : <></>}
        </Grid>
    )
}