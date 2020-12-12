import React from 'react'
import MapIcon from '@material-ui/icons/Map'
import HomeIcon from '@material-ui/icons/Home'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import FormatListNumberedRoundedIcon from '@material-ui/icons/FormatListNumberedRounded'
import HelpIcon from '@material-ui/icons/Help';
import VisibilityIcon from '@material-ui/icons/Visibility'
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core'
import { Link } from 'wouter'
import { updateOpen } from '../actions/openDrawerAction'
import { connect } from "react-redux"
import useLogin from '../hooks/useLogin'
import PostAddIcon from '@material-ui/icons/PostAdd'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined'

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
                            <Link to='/agregar-marcador' className="link" onClick={() => { updateOpen(false) }}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <AddCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Agregar Comisaria/PDI'></ListItemText>
                                </ListItem>
                            </Link>
                            <Link to='/registrar-comuna' className="link" onClick={() => { updateOpen(false) }} >
                                <ListItem button>
                                    <ListItemIcon>
                                        <PostAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Agregar comuna'></ListItemText>
                                </ListItem>
                            </Link>
                            <Link to='/ver-alertas' className="link" onClick={() => { updateOpen(false) }} >
                                <ListItem button>
                                    <ListItemIcon>
                                        <VisibilityIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Ver alertas'></ListItemText>
                                </ListItem>
                            </Link>
                            <Link to='/ver-checkins' className="link" onClick={() => { updateOpen(false) }} >
                                <ListItem button>
                                    <ListItemIcon>
                                        <CheckCircleOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Check ins'></ListItemText>
                                </ListItem>
                            </Link>
                            <Link to='/mapa' className="link" onClick={() => { updateOpen(false) }}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <MapIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Mapa'></ListItemText>
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
                            <Link to='/needHelp' className="link" onClick={() => { updateOpen(false) }}>
                                <HelpIcon>
                                </HelpIcon>
                                SOS
                            </Link>
                        </>
                        :
                        <></>
                }
                <Divider />
            </List>
        </div>
    )
}
export default connect(null, { updateOpen })(ListItemDrawer)
