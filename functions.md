# DarknessBot - Funções Ativáveis

Aqui está a lista de todas as funcionalidades que o bot oferece e que podem ser ativadas ou desativadas via configuração.

## Funcionalidades Ativáveis/Desativáveis

1. Mineração Automática
   - Descrição: O bot minera minérios automaticamente de acordo com a lista de minérios no arquivo de configuração.
   - Ativar/Desativar: autoMine.enabled no arquivo de configuração.
   - Minérios: IRON_ORE, DIAMOND_ORE, GOLD_ORE, etc.

2. Corte de Madeira (Lenhador)
   - Descrição: O bot coleta madeira até atingir a quantidade configurada.
   - Ativar/Desativar: woodCutter.enabled no arquivo de configuração.
   - Quantidade Máxima: woodCutter.maxWood no arquivo de configuração.

3. Área de Base (Limite de Movimento)
   - Descrição: O bot não sai da área de 10x10 blocos (base).
   - Ativar/Desativar: baseArea.enabled no arquivo de configuração.

4. Renascer na Base após Morte
   - Descrição: Se o bot morrer, ele renasce na base e volta para a área configurada.
   - Ativar/Desativar: respawnInBase no arquivo de configuração.

5. Dormir ao Anoitecer
   - Descrição: O bot irá procurar uma cama e dormir ao anoitecer (aproximadamente 13000 ticks).
   - Ativar/Desativar: sleepAtNight no arquivo de configuração.

6. Envio de Mensagens no Chat
   - Descrição: O bot envia mensagens automáticas a cada intervalo de tempo.
   - Ativar/Desativar: chatMessages.enabled no arquivo de configuração.
   - Intervalo: chatMessages.interval no arquivo de configuração.
   - Mensagens: Definidas em chatMessages.messages.

---

Essas são as funções que você pode configurar e ajustar conforme a necessidade do seu servidor. As funções podem ser facilmente ativadas ou desativadas através do arquivo de configuração.
