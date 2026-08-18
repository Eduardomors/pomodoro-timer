# 🍅 Pomodoro Timer

Timer de produtividade baseado na técnica Pomodoro, feito com HTML, CSS e JavaScript puro. Sem frameworks, sem dependências.

Projeto desenvolvido durante o 2º semestre de Ciência da Computação na FIAP.

## Sobre

A técnica Pomodoro divide o trabalho em blocos de 25 minutos de foco, intercalados com pausas curtas de 5 minutos. A cada 4 pomodoros, uma pausa longa de 15 minutos.

## Funcionalidades

- Timer com 3 modos: Foco (25min), Pausa Curta (5min), Pausa Longa (15min)
- Progresso visual com animação circular em SVG
- Alerta sonoro ao finalizar (Web Audio API)
- Campo para descrever a tarefa atual
- Contador de pomodoros e minutos de foco acumulados
- Histórico das sessões do dia
- Título da aba atualiza com o tempo restante
- Cores mudam conforme o modo (foco, pausa curta, pausa longa)
- Layout responsivo pra mobile

## Como usar

Basta abrir o `index.html` no navegador. Não precisa de servidor.

```bash
git clone https://github.com/Eduardomors/pomodoro-timer.git
cd pomodoro-timer

# abre direto no navegador
# no linux:
xdg-open index.html
# no mac:
open index.html
# ou só arrasta o arquivo pro navegador
```

## Tecnologias

- HTML5
- CSS3 (Flexbox, transitions, backdrop-filter)
- JavaScript vanilla (DOM, setInterval, Web Audio API)
- SVG para o indicador de progresso circular

## O que aprendi

- Manipulação do DOM sem jQuery/frameworks
- Animações CSS com transitions e SVG stroke-dashoffset
- Web Audio API pra gerar sons sem arquivos de áudio
- Organização de código JS com funções bem definidas
- Design responsivo com media queries

## Ideias pro futuro

- [ ] Permitir customizar os tempos
- [ ] Salvar histórico no localStorage
- [ ] Adicionar notificações do navegador
- [ ] Dark mode

---

Feito por [Eduardo Moreira](https://github.com/Eduardomors)
