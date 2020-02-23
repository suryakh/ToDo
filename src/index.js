import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import todoReducer from "./reducer";
import { add, check, del } from "./action";
import { Container, Grid, TextField, Paper, Checkbox, IconButton, InputAdornment, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Icon from '@material-ui/core/Icon';
import { green } from '@material-ui/core/colors';


const styles = ({
    paper: {
        padding: "10px"
    },
    paper2: {
        color: "white",
        padding: "10px",
        background: "green"
    },
    main: {
        marginTop: "50px"
    }, paperC: {
        color: "red",
        padding: "10px"
    },
    input: {
        border: "2px solid black"
    }
})
const store = createStore(todoReducer)
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemName: "",
            id: 1
        }
    }
    handlechange = (e) => {
        this.setState({
            itemName: e.target.value
        })
    }
    adding = () => {
        this.setState({
            id: this.state.id + 1
        })
        store.dispatch(add(this.state.itemName, this.state.id))
        this.setState({
            itemName: ""
        })
    }
    toggling = (id) => {
        store.dispatch(check(id))
    }
    Edit = (id, Name) => {
        this.setState({
            itemName: Name
        })
        store.dispatch(del(id))
    }
    render() {
        const data = store.getState()
        console.log(data)
        if (true) {
            return (
                <>
                    <Container justify="center" style={styles.main} >
                        <Grid container>
                            <Grid xs={3}></Grid>
                            <Grid xs={6}>
                                <Grid container>
                                    <Grid item xs={12} >
                                        <TextField fullWidth value={this.state.itemName} onChange={this.handlechange} label="Add works TODO" variant="outlined"
                                            InputProps={{
                                                endAdornment: (<InputAdornment position="end">
                                                    <IconButton onClick={this.adding}> <Icon style={{ color: green[500] }}>add_circle</Icon>
                                                    </IconButton></InputAdornment>),
                                            }} /></Grid>
                                </Grid>
                                {/* <Grid container spacing={2}> */}
                                <Grid container spacing={2} xs={12}>
                                    {data.map((ele) => <Grid item xs={12} > <Paper style={ele.completed ? styles.paperC : styles.paper} key={ele.id}><Grid container ><Grid item xs={0}><Checkbox color="primary" type="checkbox" onClick={() => this.toggling(ele.id)} /></Grid><Grid style={{ padding: "10px" }} item xs={9}><Typography align="center">{ele.itemName}</Typography></Grid><Grid item xs={1}><IconButton onClick={() => this.Edit(ele.id, ele.itemName)}><EditIcon /></IconButton></Grid><Grid item xs={1}><IconButton onClick={() => store.dispatch(del(ele.id))}><DeleteIcon /></IconButton></Grid></Grid></Paper> </Grid>)}
                                </Grid>
                                <p>Completed List </p>
                                <Grid container spacing={2} xs={12}>
                                    {data.map((ele) => {
                                        if (ele.completed)
                                            return (
                                                <Grid item xs={12}><Paper style={styles.paper2} key={ele.id}><Grid container><Grid xs={1}></Grid><Grid item xs={10} style={{ padding: "10px" }}><Typography align="center">{ele.itemName}</Typography></Grid><Grid item xs={1}><IconButton style={{ padding: "10px" }} onClick={() => store.dispatch(del(ele.id))}><DeleteIcon /></IconButton></Grid></Grid></Paper></Grid>)
                                    })

                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </>
            )
        }
    }
}
const rootElement = document.getElementById("root")
const render = () => ReactDOM.render(<App />, rootElement)
render()
store.subscribe(render)