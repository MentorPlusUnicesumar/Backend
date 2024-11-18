import random

import requests

url_base = 'http://localhost:3000/api/'

areas_de_interesse = [
    'Aws',
    'Python',
    'React',
    'Java',
    'SQL',
    'Marketing Digital',
    'Big Data',
    'Front-end',
    'Back-end',
    'Fullstack',
    'DevOps',
    'Data Science',
    'Machine Learning',
    'Deep Learning',
    'Flutter',
    'React Native',
    'NodeJS',
    'Spring Boot',
]

ids_areas = []
for area in areas_de_interesse:
    response_area = requests.post(url_base + 'areas', data={'nome': area})
    print(response_area.content)
    ids_areas.append(response_area.json()['_id'])

def getRandomArea():
    return random.choice(ids_areas)


aluno_renan = {
    "nome":"Renan Rocha",
    "email": "renan@gmail.com",
    "senha": "Teste123!",
    "telefone": "(44) 9999-9999",
    "typeUser": "Aluno",
    "cidade": "Maringá",
    "uf": "PR",
    "disponivel": True,
    "cpf": "11550847996",
    "fotos": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/renanRocha.jpg",
    "areas" : list(set([getRandomArea() for _ in range(3)])),
    "motivoCadastro": "Quero ouvir experiências reais e aprender com os erros e acertos de quem já passou por desafios semelhantes aos que enfrento.",
}

admin_prisco = {
  "nome": "Prisco",
  "email": "gabrielmarcosprisco@gmail.com",
  "senha": "Teste123!",
  "telefone": "(44) 9999-9999",
  "typeUser": "Admin",
  "cidade": "Mandaguari",
  "uf": "PR",
  "disponivel": True,
  "cpf": "13413070932",
  "fotos": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/gabrielPrisco.jpg",
  "areas": list(set([getRandomArea() for _ in range(3)])),
  "motivoCadastro": "Me cadastrar na plataforma de mentoria como mentor é uma oportunidade de retribuir à comunidade tudo o que a área de TI me proporcionou. Ao longo da minha jornada, tive a sorte de aprender com grandes profissionais e sei o quanto isso foi crucial para o meu crescimento. Agora, quero usar minha experiência para ajudar outros a trilhar o mesmo caminho.",
}

mentor_men = {
    "nome": "Guilherme Men",
    "email": "guilhermemen2003@gmail.com",
    "senha": "Teste123!",
    "telefone": "(44) 9999-9999",
    "typeUser": "Mentor",
    "cidade": "Mandaguari",
    "uf": "PR",
    "cpf": "10008997993",
    "fotos": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/guilhermeMen.jpg",
    "sobre": "Sou um desenvolvedor fullstack, com experiência em desenvolvimento web e mobile. Atualmente trabalho com React, React Native e NodeJS. Estou disposto a ajudar quem estiver disposto a aprender.",
    "instagram": "https://www.instagram.com/guilhermenairne/",
    "disponivel": True,
    "experiencias": ['Desenvolvimento de interfaces de usuário responsivas utilizando React e CSS modularizado.', 'Criação de aplicativos mobile cross-platform com React Native, otimizados para Android e iOS.', 'Implementação de autenticação e autorização segura com JWT e OAuth em aplicações Node.js.'],
    "trabDestaque": [
        {"foto": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/tec_educacao.jfif", "descricao": "Criação de aplicativos mobile para uma plataforma de ensino a distância"},
        {"foto": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/programacao.png", "descricao": "Desenvolvimento da Plataforma Mentor +"}
    ],
    "areas": list(set([getRandomArea() for _ in range(3)])),
    "competencias": ['React', 'React Native', 'NodeJS'],
    "motivoCadastro": "Me cadastrar na plataforma de mentoria como mentor é uma oportunidade de retribuir à comunidade tudo o que a área de TI me proporcionou. Ao longo da minha jornada, tive a sorte de aprender com grandes profissionais e sei o quanto isso foi crucial para o meu crescimento. Agora, quero usar minha experiência para ajudar outros a trilhar o mesmo caminho.",
}

mentor_mazzurana = {
    "nome": "Pedro Mazzurana",
    "email": "pedro@gmail.com",
    "senha": "Teste123!",
    "telefone": "(44) 9999-9999",
    "typeUser": "Mentor",
    "cidade": "Maringá",
    "uf": "PR",
    "disponivel": True,
    "cpf": "92345055065",
    "fotos": 'https://mentorplus.s3.us-east-1.amazonaws.com/fotos/pedroMazzurana.jpg',
    "sobre": "Sou especialista em desenvolvimento backend com foco em soluções escaláveis e de alto desempenho. Minha experiência inclui trabalhar com microsserviços, bancos de dados distribuídos e integração de APIs RESTful e GraphQL.",
    "instagram": "https://www.instagram.com/mazzuranapmc/",
    "linkedin": 'https://www.linkedin.com/in/pedro-mazzurana/',
    "experiencias": [
        "Desenvolvimento de microsserviços em Node.js e Python, utilizando arquitetura baseada em eventos.",
        "Gerenciamento de bancos de dados SQL e NoSQL para aplicações de grande escala.",
        "Implementação de pipelines CI/CD com ferramentas como Jenkins e GitHub Actions."
    ],
    "trabDestaque": [
        {
            "foto": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/backend_arquitetura.jpg",
            "descricao": "Desenvolvimento de uma plataforma de e-commerce com arquitetura serverless."
        },
        {
            "foto": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/analise_dados.png",
            "descricao": "Criação de um sistema de análise de dados em tempo real para uma fintech."
        }
    ],
    "competencias": ['Node.js', 'Python', 'Docker', 'Kubernetes', 'GraphQL'],
    "areas" : list(set([getRandomArea() for _ in range(3)])),
    "motivoCadastro": "Acredito no poder da mentoria para acelerar o aprendizado e a carreira de profissionais em tecnologia. Quero compartilhar meu conhecimento e contribuir para o crescimento de futuros desenvolvedores e engenheiros de software.",
}


mentores = [
    {
        "nome": "Gabriela Oliveira",
        "email": "Mentor1@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-2222",
        "typeUser": "Mentor",
        "cidade": "Mandaguari",
        "uf": "PR",
        "cpf": "68163716070",
        "fotos": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/Mentora+1+Indiana+Oculos.webp",
        "sobre": "Meu nome é Gabriela, sou desenvolvedora web com mais de 5 anos de experiência em front-end. Sou apaixonada por criar interfaces intuitivas e acessíveis. Adoro compartilhar conhecimento e ajudar profissionais a aprender sobre React e CSS.",
        "instagram": "https://www.instagram.com",
        "youtube": "https://www.youtube.com",
        "linkedin": "https://www.linkedin.com",
        "disponivel": True,
        "experiencias": ["Desenvolvimento de interfaces responsivas", "Otimização de desempenho web", "Mentoria em front-end"],
        "trabDestaque": [
            {"foto": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/tec_educacao.jfif", "descricao": "Desenvolvimento de uma interface intuitiva para uma plataforma educacional"},
            {"foto": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/programacao.png", "descricao": "Criação de componentes reutilizáveis em React para uma fintech"},
        ],
        "areas": list(set([getRandomArea() for _ in range(5)])),
        "competencias": ["HTML/CSS Avançado", "React.js", "Design Responsivo"],
        "motivoCadastro": "Acredito que orientar outros profissionais é uma excelente oportunidade de aprimorar minha comunicação, paciência e habilidades de liderança.",        
    },
    {
        "nome": "João Gustavo",
        "email": "Mentor2@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-1111",
        "typeUser": "Mentor",
        "cidade": "São Paulo",
        "uf": "SP",
        "cpf": "46237522085",
        "fotos": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/Mentor+2+Homem+50+anos.webp",
        "sobre": "Meu nome é João, sou engenheiro de software com mais de 15 anos de experiência. Tenho uma ampla trajetória em automação de testes e desenvolvimento de aplicações robustas. Atualmente, trabalho com Java, Spring Boot e Selenium, sempre buscando eficiência e inovação.",
        "instagram": "https://www.instagram.com",
        "youtube": "https://www.youtube.com",
        "linkedin": "https://www.linkedin.com",
        "disponivel": True,
        "experiencias": ["Automação de testes com Selenium", "Desenvolvimento em Spring Boot", "Liderança técnica de equipes"],
        "trabDestaque": [
            {"foto": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/tec_educacao.jfif", "descricao": "Automação de testes para um sistema bancário com Selenium"},
            {"foto": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/programacao.png", "descricao": "Desenvolvimento de uma API de pagamento utilizando Spring Boot"}
        ],
        "areas": list(set([getRandomArea() for _ in range(1)])),
        "competencias": ["Java Avançado", "Automação de Testes", "Arquitetura de Software"],
        "motivoCadastro": "Quero ajudar novos profissionais a crescer, compartilhando os aprendizados e desafios que enfrentei em minha carreira, e contribuir para o desenvolvimento da comunidade.",
    },
    {
        "nome": "Lucas Suzuki",
        "email": "Mentor3@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-3333",
        "typeUser": "Mentor",
        "cidade": "Marialva",
        "uf": "PR",
        "cpf": "43193278025",
        "fotos": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/Mentor+3+Homem+Asiatico.webp",
        "sobre": "Sou Lucas, analista de dados com especialização em manipulação e visualização de dados. Minha experiência inclui trabalhar com Python, SQL e ferramentas de Business Intelligence. Adoro desvendar o mundo dos dados e mostrar como transformar números em insights poderosos.",
        "instagram": "https://www.instagram.com",
        "youtube": "https://www.youtube.com",
        "linkedin": "https://www.linkedin.com",
        "disponivel": True,
        "experiencias": ["Criação de dashboards interativos", "Análise de grandes volumes de dados", "Automatização de relatórios"],
        "trabDestaque": [
            {"foto": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/analise_dadospng.png", "descricao": "Criação de dashboards interativos com Power BI"},
        ],
        "areas": list(set([getRandomArea() for _ in range(4)])),
        "competencias": ["Python Avançado", "SQL", "Power BI"],
        "motivoCadastro": "Ser mentor me permite conectar com talentos promissores e outros profissionais da área, fortalecendo minha rede de relacionamentos na TI.",
    },
    {
        "nome": "Lara Almeida",
        "email": "Mentor4@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-4444",
        "typeUser": "Mentor",
        "cidade": "Rio de Janeiro",
        "uf": "RJ",
        "cpf": "77482899057",
        "fotos": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/Mentor+4+Mulher+Ruiva.webp",
        "sobre": "Meu nome é Lara, especialista em marketing digital com foco em pequenas empresas. Tenho mais de 8 anos de experiência ajudando negócios a crescer online. Minha missão é criar estratégias eficazes e compartilhar conhecimentos práticos sobre o mercado digital.",
        "instagram": "https://www.instagram.com",
        "youtube": "https://www.youtube.com",
        "linkedin": "https://www.linkedin.com",
        "disponivel": True,
        "experiencias": ["Criação de estratégias de marketing digital", "Gestão de campanhas online", "Mentoria em redes sociais"],
        "trabDestaque": [
            {"foto": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/tec_educacao.jfif", "descricao": "Gestão de campanhas de marketing digital para uma startup"},
            {"foto": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/analise_dadospng.png", "descricao": "Estratégia de SEO para aumentar o tráfego de um blog corporativo"},
            {"foto": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/programacao.png", "descricao": "Criação de conteúdo para redes sociais de uma pequena empresa"}
        ],
        "areas": list(set([getRandomArea() for _ in range(6)])),
        "competencias": ["SEO e SEM", "Marketing de Conteúdo", "Gestão de Mídias Pagas"],
        "motivoCadastro": "Enxergo a mentoria como uma via de mão dupla, onde não apenas ensino, mas também aprendo com as diferentes visões e desafios trazidos pelos mentorados.",
    },
    {
        "nome": "Helena Rocha",
        "email": "Mentor5@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-5555",
        "typeUser": "Mentor",
        "cidade": "São Paulo",
        "uf": "SP",
        "cpf": "84825754066",
        "fotos": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/Mentor+5+Mulher+Cacheada.webp",
        "sobre": "Meu nome é Helena, engenheira de dados com mais de 7 anos de experiência em Big Data. Trabalho com tecnologias modernas para processamento de dados em larga escala. Meu objetivo é mostrar como dados podem ser usados estrategicamente para tomada de decisões.",
        "instagram": "https://www.instagram.com",
        "youtube": "https://www.youtube.com",
        "linkedin": "https://www.linkedin.com",
        "disponivel": True,
        "experiencias": ["Processamento de dados em larga escala", "Modelagem de dados", "Implementação de pipelines de dados"],
        "trabDestaque": [
            {"foto": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/analise_dadospng.png", "descricao": "Implementação de um pipeline de dados para análise de Big Data"},
        ],
        "areas": list(set([getRandomArea() for _ in range(5)])),
        "competencias": ["Big Data", "Apache Spark", "Modelagem de Dados"],
        "motivoCadastro": "Quero ser parte do crescimento de uma nova geração de profissionais, ajudando a formar um ecossistema mais forte, diverso e colaborativo.",
    },
]

alunos = [
    {
        "nome": "Ana Paula",
        "email": "Aluno1@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-9999",
        "typeUser": "Aluno",
        "cidade": "Maringá",
        "instagram": "https://www.instagram.com",
        "youtube": "https://www.youtube.com",
        "linkedin": "https://www.linkedin.com",
        "uf": "PR",
        "disponivel": True,
        "cpf": "65720110038",
        "fotos": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/Aluna+1+Loira+Branca.webp",
        "areas" : list(set([getRandomArea() for _ in range(3)])),
        "motivoCadastro": "Quero aprender com a experiência de quem já trilhou o caminho que estou começando, reduzindo erros e ganhando tempo no meu desenvolvimento.",
    },
        {
        "nome": "Cleiton Soares",
        "email": "Aluno2@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-9999",
        "typeUser": "Aluno",
        "cidade": "Marialva",
        "instagram": "https://www.instagram.com",
        "youtube": "https://www.youtube.com",
        "linkedin": "https://www.linkedin.com",
        "uf": "PR",
        "disponivel": True,
        "cpf": "89958008017",
        "fotos": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/Aluno+2+Negro.webp",
        "areas" : list(set([getRandomArea() for _ in range(3)])),
        "motivoCadastro": "Tenho dificuldades em algumas áreas e acredito que, com a ajuda de um mentor, posso superar esses obstáculos de forma mais assertiva.",
    },
        {
        "nome": "Vitor Pereira",
        "email": "Aluno3@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-9999",
        "instagram": "https://www.instagram.com",
        "youtube": "https://www.youtube.com",
        "linkedin": "https://www.linkedin.com",
        "typeUser": "Aluno",
        "cidade": "Sarandi",
        "uf": "PR",
        "disponivel": True,
        "cpf": "14463803004",
        "fotos": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/Aluno+3+Homem+Branco.webp",
        "areas" : list(set([getRandomArea() for _ in range(3)])),
        "motivoCadastro": "Busco orientações práticas e diretas de alguém que entenda meu contexto e possa me ajudar a tomar decisões mais embasadas.",
    },
        {
        "nome": "Leticia Linhares",
        "email": "Aluno4@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-9999",
        "instagram": "https://www.instagram.com",
        "youtube": "https://www.youtube.com",
        "linkedin": "https://www.linkedin.com",
        "typeUser": "Aluno",
        "cidade": "Mandaguari",
        "uf": "PR",
        "disponivel": True,
        "cpf": "76832145071",
        "fotos": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/Aluna+4+Mulher+loira.webp",
        "areas" : list(set([getRandomArea() for _ in range(3)])),
        "motivoCadastro": "Participar da mentoria é uma forma de me conectar com profissionais experientes e aumentar minhas oportunidades de networking.",
    },
        {
        "nome": "Murilo Esteves",
        "email": "Aluno5@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-9999",
        "typeUser": "Aluno",
        "cidade": "Maringá",
        "instagram": "https://www.instagram.com",
        "youtube": "https://www.youtube.com",
        "linkedin": "https://www.linkedin.com",
        "uf": "PR",
        "disponivel": True,
        "cpf": "94207098097",
        "fotos": "https://mentorplus.s3.us-east-1.amazonaws.com/fotos/Aluno+5+Homem+Ruivo.webp",
        "areas" : list(set([getRandomArea() for _ in range(3)])),
        "motivoCadastro": "Com a orientação certa, acredito que posso ter mais segurança nas minhas escolhas profissionais e mais clareza sobre o caminho a seguir.",
    },
]

for mentor in mentores + alunos:
    print(f'Cadastrando Mentor {mentor["nome"]}')
    tmp = requests.post(url_base + 'users', json=mentor)
    print(tmp.json())
    mentor.update({'_id': tmp.json()['_id']})

response_aluno_renan = requests.post(url_base + 'users', json=aluno_renan)
print(response_aluno_renan)
print(response_aluno_renan.json())

response_mentor_men = requests.post(url_base + 'users', json=mentor_men)
print(response_mentor_men)
print(response_mentor_men.json())

response_mentor_mazzurana = requests.post(url_base + 'users', json=mentor_mazzurana)
print(response_mentor_mazzurana)
print(response_mentor_mazzurana.json())

response_admin_prisco = requests.post(url_base + 'users', json=admin_prisco)
print(response_admin_prisco)
print(response_admin_prisco.json())

input('Edite Manualmente o usuario de admin do Prisco mude seu status para aprovado')

# Login Admin
res_login_prisco = requests.post(url_base + 'auth/login', data={
    'email': admin_prisco['email'],
    'senha': admin_prisco['senha']
})

def getHeader(token: str):
    headers = {
        ""
        "Authorization": f"Bearer {token}",
    }
    return headers


# Atualiza os status para Aprovado
for response in [response_admin_prisco.json(), response_aluno_renan.json(), response_mentor_men.json()] +\
    mentores + alunos:
    tmp = requests.patch(
        url=url_base + f'users/update-status/{response["_id"]}',
        data={
            'status': 'Aprovado',
        },
        headers=getHeader(res_login_prisco.json()['access_token'])
    )
    print(tmp)
    print(tmp.json())


# Login Aluno 
res_login_renan = requests.post(url_base + 'auth/login', data={
    'email': aluno_renan['email'],
    'senha': aluno_renan['senha']
})
print(res_login_renan)
print(res_login_renan.json())

token_renan = res_login_renan.json()['access_token']

# Login Mentor
res_mentor_men = requests.post(url_base + 'auth/login', data={
    'email': mentor_men['email'],
    'senha': mentor_men['senha']
})
print(res_mentor_men)
print(res_mentor_men.json())

# Criar Mentorias 
# Aluno Renan com todos os mentores

response_mentoria = requests.post(
    url=url_base + 'mentorias',
    json={
        "idMentor": response_mentor_men.json()['_id'],
        "idAluno": response_aluno_renan.json()['_id'],
        "nome": "AWS Migrations",
        "descricao": "Como migrar de uma vez para a nuvem",
        "qtdtotal": 5,
    },
    headers=getHeader(token_renan)
)
print(response_mentoria.json())

response_mentoria2 = requests.post(
    url=url_base + 'mentorias',
    json={
        "idMentor": mentores[0]['_id'],
        "idAluno": response_aluno_renan.json()['_id'], 
        "nome": "Python para Web",
        "descricao": "Como criar aplicações web simples com Django",
        "qtdtotal": 10,
    },
    headers=getHeader(token_renan)
)

response_mentoria3 = requests.post(
    url=url_base + 'mentorias',
    json={
        "idMentor": response_mentor_men.json()['_id'],
        "idAluno": alunos[0]['_id'], 
        "nome": "React para Iniciantes",
        "descricao": "Aprenda a criar aplicações web com React",
        "qtdtotal": 10,
    },
    headers=getHeader(token_renan)
)

print(response_mentoria2.json())

# Criar chat e mensagens
response_chat = requests.post(
    url=url_base + 'chat', 
    json={
        'idAluno': response_aluno_renan.json()['_id'],
        'idMentor': res_mentor_men.json()['_id'],
    }, 
    headers=getHeader(token_renan)
)

print(response_chat.json())