import random

import requests

url_base = 'http://localhost:3000/'

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
    ids_areas.append(response_area.json()['_id'])

def getRandomArea():
    return random.choice(ids_areas)


aluno_renan = {
    "nome":"Renan Rocha",
    "email": "renan@gmail.com",
    "senha": "Teste123!",
    "telefone": "(44)9999-9999",
    "typeUser": "Aluno",
    "cidade": "Mandaguari",
    "uf": "PR",
    "cpf": "11550847996",
    "fotos": "https://avatars.githubusercontent.com/u/77353839?v=4",
    "areas" : list(set([getRandomArea() for _ in range(3)])),
}

admin_prisco = {
  "nome": "Prisco",
  "email": "gabrielmarcosprisco@gmail.com",
  "senha": "Teste123!",
  "telefone": "(44)9999-9999",
  "typeUser": "Admin",
  "status": "Aprovado",
  "cidade": "Mandaguari",
  "uf": "PR",
  "cpf": "13413070932",
  "fotos": "https://avatars.githubusercontent.com/u/72769726?v=4",
  "areas": list(set([getRandomArea() for _ in range(3)])),
}

mentor_men = {
    "nome": "Guilherme Men",
    "email": "guilhermemen2003@gmail.com",
    "senha": "Teste123!",
    "telefone": "(44)9999-9999",
    "typeUser": "Mentor",
    "status": "Aprovado",
    "cidade": "Mandaguari",
    "uf": "PR",
    "cpf": "10008997993",
    "fotos": "https://avatars.githubusercontent.com/u/62121362?v=4",
    "sobre": "Sou um desenvolvedor fullstack, com experiência em desenvolvimento web e mobile. Atualmente trabalho com React, React Native e NodeJS. Estou disposto a ajudar quem estiver disposto a aprender.",
    "instagram": "https://www.instagram.com/guilhermenairne/",
    "disponivel": True,
    "experiencias": [''],
    "trabDestaque": [],
    "areas": list(set([getRandomArea() for _ in range(3)])),
    "competencias": [''],
}

mentores = [
    {
        "nome": "Neymar Junior",
        "email": "Mentor1@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-1111",
        "typeUser": "Mentor",
        "cidade": "Mandaguari",
        "uf": "PR",
        "cpf": "46237522085",
        "fotos": "https://i.pinimg.com/736x/ba/4b/4d/ba4b4d89ee0dcc15ac908758e0eb737a.jpg",  # Neymar
        "sobre": "Sou engenheiro de software com experiência em automação de testes e desenvolvimento de aplicações web. Estou disposto a ajudar quem estiver disposto a aprender. Atualmente trabalho com Java, Selenium e Spring Boot.",
        "instagram": "https://www.instagram.com/neymarjr/",
        "youtube": "https://www.youtube.com/user/neymar",
        "linkedin": "https://www.linkedin.com/in/neymarjr/",
        "disponivel": True,
        "experiencias": [''],
        "trabDestaque": [],
        "areas": list(set([getRandomArea() for _ in range(1)])),
        "competencias": [''],
    },
    {
        "nome": "Anya Taylor-Joy",
        "email": "Mentor2@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-2222",
        "typeUser": "Mentor",
        "cidade": "Mandaguari",
        "uf": "PR",
        "cpf": "68163716070",
        "fotos": "",
        "sobre": "https://static.stealthelook.com.br/wp-content/uploads/2021/11/o-segredo-do-loiro-platinado-e-sempre-hidratado-de-anya-taylor-joy-2-20211117221419.jpgSou desenvolvedora web com foco em front-end. Adoro ensinar e compartilhar conhecimento sobre React e CSS.",
        "instagram": "https://www.instagram.com/anyataylorjoy/",
        "youtube": "https://www.youtube.com/c/anyataylorjoy",
        "linkedin": "https://www.linkedin.com/in/anyataylorjoy/",
        "disponivel": True,
        "experiencias": [''],
        "trabDestaque": [],
        "areas": list(set([getRandomArea() for _ in range(5)])),
        "competencias": [''],
    },
    {
        "nome": "Neil Tyson",
        "email": "Mentor3@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-3333",
        "typeUser": "Mentor",
        "cidade": "Mandaguari",
        "uf": "PR",
        "cpf": "43193278025",
        "fotos": "https://www.oficinadanet.com.br/imagens/post/25047/neildegrassetyson1.jpg",
        "sobre": "Sou analista de dados e trabalho com Python e SQL. Estou aqui para ajudar você a desvendar o mundo dos dados!",
        "instagram": "https://www.instagram.com/neiltyson/",
        "youtube": "https://www.youtube.com/user/neiltyson",
        "linkedin": "https://www.linkedin.com/in/neiltyson/",
        "disponivel": True,
        "experiencias": [''],
        "trabDestaque": [],
        "areas": list(set([getRandomArea() for _ in range(4)])),
        "competencias": [''],
    },
    {
        "nome": "Marshal Mathers",
        "email": "Mentor4@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-4444",
        "typeUser": "Mentor",
        "cidade": "Mandaguari",
        "uf": "PR",
        "cpf": "77482899057",
        "fotos": "https://s.yimg.com/zb/imgv1/2d1bd1a5-7779-3c48-a638-0533ace5e563/t_500x300",
        "sobre": "Sou especialista em marketing digital e adoro ajudar pequenas empresas a crescerem online.",
        "youtube": "https://www.youtube.com/user/eminemVEVO",
        "linkedin": "https://www.linkedin.com/in/eminem/",
        "disponivel": True,
        "experiencias": ['Frestyle Avançado', 'Rap battle', 'Marketing Digital'],
        "trabDestaque": [
            {'foto': 'https://s.yimg.com/zb/imgv1/2d1bd1a5-7779-3c48-a638-0533ace5e563/t_500x300', 'descricao': 'Como criar um site de sucesso'},
            {'foto': 'https://s.yimg.com/zb/imgv1/2d1bd1a5-7779-3c48-a638-0533ace5e563/t_500x300', 'descricao': 'Como criar um site de sucesso'},
            {'foto': 'https://s.yimg.com/zb/imgv1/2d1bd1a5-7779-3c48-a638-0533ace5e563/t_500x300', 'descricao': 'Como criar um site de sucesso'},
            {'foto': 'https://s.yimg.com/zb/imgv1/2d1bd1a5-7779-3c48-a638-0533ace5e563/t_500x300', 'descricao': 'Como criar um site de sucesso'},
            {'foto': 'https://s.yimg.com/zb/imgv1/2d1bd1a5-7779-3c48-a638-0533ace5e563/t_500x300', 'descricao': 'Como criar um site de sucesso'},
            ],
        "areas": list(set([getRandomArea() for _ in range(6)])),
        "competencias": ['Graduado em Engenharia de Software', 'Rapper Profissional', 'Pós Graduação em Música'],
    },
    {
        "nome": "Bill Gates",
        "email": "Mentor5@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-5555",
        "typeUser": "Mentor",
        "cidade": "Mandaguari",
        "uf": "PR",
        "cpf": "84825754066",
        "fotos": "https://t.ctcdn.com.br/fk_aOxh1UDtQPXkbkBn7ZGCPXdI=/i490763.jpeg",
        "sobre": "Sou engenheiro de dados e tenho experiência em Big Data. Estou aqui para compartilhar tudo o que sei sobre dados em larga escala.",
        "instagram": "https://www.instagram.com/billgates/",
        "youtube": "https://www.youtube.com/user/Microsoft",
        "linkedin": "https://www.linkedin.com/in/williamhgates/",
        "disponivel": True,
        "experiencias": [''],
        "trabDestaque": [],
        "areas": list(set([getRandomArea() for _ in range(5)])),
        "competencias": [''],
    },
]

alunos = [
    {
        "nome": "Aluno 1",
        "email": "Aluno1@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44)9999-9999",
        "typeUser": "Aluno",
        "cidade": "Mandaguari",
        "uf": "PR",
        "cpf": "65720110038",
        "fotos": "foto.com.br",
        "areas" : list(set([getRandomArea() for _ in range(3)])),
    },
        {
        "nome": "Aluno 2",
        "email": "Aluno2@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44)9999-9999",
        "typeUser": "Aluno",
        "cidade": "Mandaguari",
        "uf": "PR",
        "cpf": "89958008017",
        "fotos": "foto.com.br",
        "areas" : list(set([getRandomArea() for _ in range(3)])),
    },
        {
        "nome": "Aluno 3",
        "email": "Aluno3@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44)9999-9999",
        "typeUser": "Aluno",
        "cidade": "Mandaguari",
        "uf": "PR",
        "cpf": "14463803004",
        "fotos": "foto.com.br",
        "areas" : list(set([getRandomArea() for _ in range(3)])),
    },
        {
        "nome": "Aluno 4",
        "email": "Aluno4@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44)9999-9999",
        "typeUser": "Aluno",
        "cidade": "Mandaguari",
        "uf": "PR",
        "cpf": "76832145071",
        "fotos": "foto.com.br",
        "areas" : list(set([getRandomArea() for _ in range(3)])),
    },
        {
        "nome": "Aluno 5",
        "email": "Aluno5@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44)9999-9999",
        "typeUser": "Aluno",
        "cidade": "Mandaguari",
        "uf": "PR",
        "cpf": "94207098097",
        "fotos": "foto.com.br",
        "areas" : list(set([getRandomArea() for _ in range(3)])),
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