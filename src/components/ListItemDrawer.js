import React from 'react'
import MapIcon from '@material-ui/icons/Map'
import PieChartIcon from '@material-ui/icons/PieChart'
import BarChartIcon from '@material-ui/icons/BarChart'
import FormatListNumberedRoundedIcon from '@material-ui/icons/FormatListNumberedRounded';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core'
import { Link } from 'wouter'
import { updateOpen } from '../actions/openDrawerAction'
import { connect } from "react-redux"

function ListItemDrawer({ updateOpen }) {
    return (
        <div>
            <List component='nav'>
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
