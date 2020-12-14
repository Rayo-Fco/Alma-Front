import React, { useEffect, useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import api from '../services/api'


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#fd9eef',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

function createData(name, quantity) {
  return { name, quantity }
}

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
  progress: {
    height: '100%',
  },
  circular: {
    color: '#fd9eef'
  },
})


 function DataTable() {
  const classes = useStyles()
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    let isMounted = true
    const token = window.sessionStorage.getItem('tokenadmin')
    const query = async () => {

      await api.get(`/dashboard`, {
        headers: { Authorization: 'Bearer ' + token }
      })
        .then(res => {
          if (isMounted) {
            const row = [
              createData('Checkins', res.data.numero_checkin),
              createData('Usuarios', res.data.numero_user),
              createData('Comisarias', res.data.numero_comisaria),
              createData('Cuarteles', res.data.numero_cuartes),
              createData('Comunas', res.data.numero_comuna),
              createData('Alertas de SOS', res.data.numero_help[0].total_puntos),

            ]
            setRows(row)
            setIsLoading(false)

          }
        }).catch(function (e) {
          if (isMounted) {
            if (axios.isCancel(e)) {
            }
          }
        })
    }
    query()
    return function () {
      isMounted = false
    }
  }, [setRows])


  return (

    <>
      {isLoading &&
        <div className={classes.progress}>
          <CircularProgress className={classes.circular} style={{ width: '10%', height: '10%', }} />
        </div>
      }

      {!isLoading &&
        <TableContainer component={Paper}>


          <Table className={classes.table} aria-label='customized table'>
            <TableHead style={{ backgroundColor: 'pink' }}>
              <TableRow >
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell align='right'>Cantidad Total</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component='th' scope='row'>
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{row.quantity}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>

        </TableContainer>
      }
    </>
  )
}
export default DataTable

