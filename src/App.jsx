import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
	CssBaseline, Container, SpeedDial, SpeedDialIcon, SpeedDialAction, Grid, Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ConnectBox from './components/ConnectBox';


const theme = createTheme({
	palette: {
		background: {
			default: '#222222',
		},
	},
});

export default function App() {
	const [boxes, setBoxes] = useState([...Array(1).keys()]);
	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="md">
				<CssBaseline />
				<Grid
					container
					spacing={3}
					alignItems="flex-start"
				>
					{boxes.map(idx => (
						<ConnectBox key={`connect-box-${idx}`}
							number={idx} boxes={boxes} setBoxes={setBoxes} />
					))}
				</Grid>
				<Box sx={{ height: 240, transform: 'translateZ(0px)', flexGrow: 10 }}>
					<SpeedDial
						ariaLabel="SpeedDial actions"
						sx={{ position: 'absolute', bottom: 16, right: 16 }}
						icon={<SpeedDialIcon />}
					>
						<SpeedDialAction
							key={`add-connect-box`}
							icon={<AddIcon />}
							onClick={() => setBoxes([...boxes, boxes.length])}
							tooltipTitle={"add connect box"}
						/>
						<SpeedDialAction
							key={`remove-all-connect-box`}
							icon={<DeleteIcon />}
							onClick={() => setBoxes([])}
							tooltipTitle={"remove all connect box"}
						/>
					</SpeedDial>
				</Box>

			</Container>
		</ThemeProvider>
	);
}
