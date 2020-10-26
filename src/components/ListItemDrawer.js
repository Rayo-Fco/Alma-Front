import React from 'react'
import MapIcon from '@material-ui/icons/Map'
import PieChartIcon from '@material-ui/icons/PieChart'
import BarChartIcon from '@material-ui/icons/BarChart'
import HomeIcon from '@material-ui/icons/Home'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import FormatListNumberedRoundedIcon from '@material-ui/icons/FormatListNumberedRounded';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core'
import { Link } from 'wouter'
import { updateOpen } from '../actions/openDrawerAction'
import { connect } from "react-redux"
import useLogin from '../hooks/useLogin';

function ListItemDrawer({ updateOpen }) {
    const { isLogged } = useLogin()

    return (
        <div>
            <List component='nav'>
                {
                    isLogged
                        ?
                        <>
                            <Link to='/principal' className="link" onClick={() => { updateOpen(false) }}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Inicio'></ListItemText>
                                </ListItem>
                            </Link>
                            <Link to='/add' className="link" onClick={() => { updateOpen(false) }}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <AddCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Agregar Comisaria/PDI'></ListItemText>
                                </ListItem>
                            </Link>
                        </>
                        :
                        <></>
                }
                <Link to='/map' className="link" onClick={() => { updateOpen(false) }}>
                    <ListItem button>
                        <ListItemIcon>
                            <MapIcon />
                        </ListItemIcon>
                        <ListItemText primary='Mapa'></ListItemText>
                    </ListItem>
                </Link>
                <Link to='/grafico1' className="link" onClick={() => { updateOpen(false) }} >
                    <ListItem button>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary='Grafico de usuarios'></ListItemText>
                    </ListItem>
                </Link>
                <Link to='/grafico2' className="link" onClick={() => { updateOpen(false) }} >
                    <ListItem button>
                        <ListItemIcon>
                            <PieChartIcon />
                        </ListItemIcon>
                        <ListItemText primary='Grafico del uso del boton'></ListItemText>
                    </ListItem>
                </Link>
                <Link to='/comunas' className="link" onClick={() => { updateOpen(false) }} >
                    <ListItem button>
                        <ListItemIcon>
                            <FormatListNumberedRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary='Lista de comunas'></ListItemText>
                    </ListItem>
                </Link>
                <Divider />
            </List>
        </div>
    )
}
export default connect(null, { updateOpen })(ListItemDrawer)
