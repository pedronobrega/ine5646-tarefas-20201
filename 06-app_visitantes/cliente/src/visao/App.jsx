import React, { useState, useEffect } from 'react'
import {Panel} from 'primereact/panel'
import {Button} from 'primereact/button'
import {Chart} from 'primereact/chart'
import {ProgressSpinner} from 'primereact/progressspinner';

import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'


const EnumSituacao = {
  INICIAL : 0,
  EXIBINDO : 1,
  PESQUISANDO : 2
}


function useModelo() {


  /**
 * dados : [ [mes, visitantes], ..., [mes, visitantes]]
 * 
 * retorna : {meses: [mes, ..., mes], visitantes: [visitantes, ..., visitantes]}
 */
  function extraiMesesEVisitantes(dados) {
  // reducer : (acumulado, dado) => novo acumulado
    const reducer = ([meses, visitantes], [mes, vis]) => [meses.concat(mes), visitantes.concat(vis)]
    const inicial = [[],[]]
    const [meses, visitantes] = dados.reduce(reducer, inicial)
    return {meses, visitantes}
  }

  const estadoInicial = {situacao: EnumSituacao.INICIAL, dados: undefined}

  const [estado, setEstado] = useState(estadoInicial)

  useEffect(() => {
    if (estado.situacao === EnumSituacao.PESQUISANDO) {
      window.fetch('/dados')
        .then(r => r.json())
        .then(dadosEmArray => 
          setEstado({ dados: extraiMesesEVisitantes(dadosEmArray), situacao: EnumSituacao.EXIBINDO}))
    }  
  }, [estado.situacao])


  function fechaGrafico() {
    setEstado(estadoInicial)
  }

  function buscaDados() {
    setEstado({dados: undefined, situacao: EnumSituacao.PESQUISANDO})
  }

  return [estado, {buscaDados, fechaGrafico}]
}


export default function App () {
  const [estado, {buscaDados, fechaGrafico}] = useModelo()

  let conteudo
  
  switch (estado.situacao) {
  case EnumSituacao.INICIAL: {
    conteudo = <Button label='Obter Dados' onClick={() => buscaDados()}/>
    break
  }

  case EnumSituacao.PESQUISANDO: {
    conteudo = <ProgressSpinner/>
    break
  }
  
  case EnumSituacao.EXIBINDO: {
    const dadosDoGrafico = {
      labels: estado.dados.meses,
      datasets: [
        {
          label: 'Visitantes',
          backgroundColor: 'blue',
          data: estado.dados.visitantes
        }
      ]
    }
    conteudo = 
      <Panel header='Dados dos Visisantes'>
        <Button label='Fechar' onClick={fechaGrafico}/>
        <Chart type='bar' data={dadosDoGrafico}/>
      </Panel>
  }
  }

  return (
    <Panel header='UFSC - CTC - INE - INE5646 :: App Visitantes'>
      <div>{conteudo}</div>
    </Panel>
  )

}
