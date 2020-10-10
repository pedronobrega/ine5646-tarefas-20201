import React from 'react'

function Autores ({
    mostrandoAutores,
    autores,
    dispatch
}) {
    return (
        <div className='message is-link'>
            {
                !mostrandoAutores && 
                <button 
                    className='button is-warning'
                    onClick={() => dispatch({type: 'MOSTRA_AUTORES', value: true})}>
                    Mostrar Autores
                </button>
            }
        {
            mostrandoAutores &&
            <React.Fragment>
                <div className='message-header'>Autores</div>
                <div className='message-body'>
                    <table className='table' >
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Nome</th>
                                <th>Matrícula</th>
                            </tr>
                        </thead>
                        {
                        autores.map( (autor, i) =>
                                <tr key={i}>
                                    <td>{i=1}</td>
                                    <td>{autor.nome}</td>
                                    <td>{autor.matricula}</td>
                                </tr>
                            )
                        }
                    </table>
                </div>
                <button 
                    className='button is-success'
                    onClick={() => dispatch({type: 'MOSTRA_AUTORES', value: false})}
                >
                    Ok
                </button>
            </React.Fragment>}
        </div>
    )
}

export default Autores