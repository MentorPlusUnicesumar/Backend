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
    "name":"Renan Rocha",
    "email": "renan@gmail.com",
    "senha": "Teste123!",
    "telefone": "(44)9999-9999",
    "typeUser": "Aluno",
    "cidade": "Mandaguari",
    "uf": "Acre",
    "cpf": "11550847996",
    "fotos": "https://avatars.githubusercontent.com/u/77353839?v=4",
    "areasInteresse" : list(set([getRandomArea() for _ in range(3)])),
}

admin_prisco = {
  "name": "Prisco",
  "email": "gabrielmarcosprisco@gmail.com",
  "senha": "Teste123!",
  "telefone": "(44)9999-9999",
  "typeUser": "Admin",
  "status": "Aprovado",
  "cidade": "Mandaguari",
  "uf": "Acre",
  "cpf": "13413070932",
  "fotos": "https://avatars.githubusercontent.com/u/72769726?v=4",
}

mentor_men = {
    "name": "Guilherme Men",
    "email": "guilhermemen2003@gmail.com",
    "senha": "Teste123!",
    "telefone": "(44)9999-9999",
    "typeUser": "Mentor",
    "status": "Aprovado",
    "cidade": "Mandaguari",
    "uf": "Acre",
    "cpf": "10008997993",
    "fotos": "https://avatars.githubusercontent.com/u/62121362?v=4",
    "sobre": "Sou um desenvolvedor fullstack, com experiência em desenvolvimento web e mobile. Atualmente trabalho com React, React Native e NodeJS. Estou disposto a ajudar quem estiver disposto a aprender.",
    "instagram": "https://www.instagram.com/guilhermenairne/",
    "disponivel": True,
    "experiencias": [''],
    "trabDestaque": [],
    "areaDeEnsino": list(set([getRandomArea() for _ in range(3)])),
    "competencias": [''],
}

mentores = [
    {
        "name": "Neymar Junior",
        "email": "Mentor1@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-1111",
        "typeUser": "Mentor",
        "cidade": "Mandaguari",
        "uf": "Acre",
        "cpf": "46237522085",
        "fotos": "https://pt.wikipedia.org/wiki/Ficheiro:Neymar_Jr._with_Al_Hilal,_3_October_2023_-_03_(cropped).jpg",  # Neymar
        "sobre": "Sou engenheiro de software com experiência em automação de testes e desenvolvimento de aplicações web. Estou disposto a ajudar quem estiver disposto a aprender. Atualmente trabalho com Java, Selenium e Spring Boot.",
        "instagram": "https://www.instagram.com/neymarjr/",
        "youtube": "https://www.youtube.com/user/neymar",
        "linkedin": "https://www.linkedin.com/in/neymarjr/",
        "disponivel": True,
        "experiencias": [''],
        "trabDestaque": [],
        "areaDeEnsino": list(set([getRandomArea() for _ in range(1)])),
        "competencias": [''],
    },
    {
        "name": "Anya Taylor-Joy",
        "email": "Mentor2@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-2222",
        "typeUser": "Mentor",
        "cidade": "Mandaguari",
        "uf": "Acre",
        "cpf": "68163716070",
        "fotos": "https://pt.wikipedia.org/wiki/Ficheiro:Anya_Taylor-Joy_at_Cannes_2024_02.jpg",  # Anya Taylor-Joy
        "sobre": "Sou desenvolvedora web com foco em front-end. Adoro ensinar e compartilhar conhecimento sobre React e CSS.",
        "instagram": "https://www.instagram.com/anyataylorjoy/",
        "youtube": "https://www.youtube.com/c/anyataylorjoy",
        "linkedin": "https://www.linkedin.com/in/anyataylorjoy/",
        "disponivel": True,
        "experiencias": [''],
        "trabDestaque": [],
        "areaDeEnsino": list(set([getRandomArea() for _ in range(5)])),
        "competencias": [''],
    },
    {
        "name": "Neil Tyson",
        "email": "Mentor3@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-3333",
        "typeUser": "Mentor",
        "cidade": "Mandaguari",
        "uf": "Acre",
        "cpf": "43193278025",
        "fotos": "https://pt.wikipedia.org/wiki/Ficheiro:Tyson_-_Apollo_40th_anniversary_2009.jpg",
        "sobre": "Sou analista de dados e trabalho com Python e SQL. Estou aqui para ajudar você a desvendar o mundo dos dados!",
        "instagram": "https://www.instagram.com/neiltyson/",
        "youtube": "https://www.youtube.com/user/neiltyson",
        "linkedin": "https://www.linkedin.com/in/neiltyson/",
        "disponivel": True,
        "experiencias": [''],
        "trabDestaque": [],
        "areaDeEnsino": list(set([getRandomArea() for _ in range(4)])),
        "competencias": [''],
    },
    {
        "name": "Marshal Mathers",
        "email": "Mentor4@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-4444",
        "typeUser": "Mentor",
        "cidade": "Mandaguari",
        "uf": "Acre",
        "cpf": "77482899057",
        "fotos": "https://s.yimg.com/zb/imgv1/2d1bd1a5-7779-3c48-a638-0533ace5e563/t_500x300",
        "sobre": "Sou especialista em marketing digital e adoro ajudar pequenas empresas a crescerem online.",
        "youtube": "https://www.youtube.com/user/eminemVEVO",
        "linkedin": "https://www.linkedin.com/in/eminem/",
        "disponivel": True,
        "experiencias": [''],
        "trabDestaque": [],
        "areaDeEnsino": list(set([getRandomArea() for _ in range(6)])),
        "competencias": [''],
    },
    {
        "name": "Bill Gates",
        "email": "Mentor5@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44) 9999-5555",
        "typeUser": "Mentor",
        "cidade": "Mandaguari",
        "uf": "Acre",
        "cpf": "84825754066",
        "fotos": "https://pt.wikipedia.org/wiki/Ficheiro:Bill_Gates_-_2023_-_P062021-670188_(cropped).jpg",
        "sobre": "Sou engenheiro de dados e tenho experiência em Big Data. Estou aqui para compartilhar tudo o que sei sobre dados em larga escala.",
        "instagram": "https://www.instagram.com/billgates/",
        "youtube": "https://www.youtube.com/user/Microsoft",
        "linkedin": "https://www.linkedin.com/in/williamhgates/",
        "disponivel": True,
        "experiencias": [''],
        "trabDestaque": [],
        "areaDeEnsino": list(set([getRandomArea() for _ in range(5)])),
        "competencias": [''],
    },
]

alunos = [
    {
        "name": "Aluno 1",
        "email": "Aluno1@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44)9999-9999",
        "typeUser": "Aluno",
        "cidade": "Mandaguari",
        "uf": "Acre",
        "cpf": "65720110038",
        "fotos": "foto.com.br",
        "areasInteresse" : list(set([getRandomArea() for _ in range(3)])),
    },
        {
        "name": "Aluno 2",
        "email": "Aluno2@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44)9999-9999",
        "typeUser": "Aluno",
        "cidade": "Mandaguari",
        "uf": "Acre",
        "cpf": "89958008017",
        "fotos": "foto.com.br",
        "areasInteresse" : list(set([getRandomArea() for _ in range(3)])),
    },
        {
        "name": "Aluno 3",
        "email": "Aluno3@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44)9999-9999",
        "typeUser": "Aluno",
        "cidade": "Mandaguari",
        "uf": "Acre",
        "cpf": "14463803004",
        "fotos": "foto.com.br",
        "areasInteresse" : list(set([getRandomArea() for _ in range(3)])),
    },
        {
        "name": "Aluno 4",
        "email": "Aluno4@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44)9999-9999",
        "typeUser": "Aluno",
        "cidade": "Mandaguari",
        "uf": "Acre",
        "cpf": "76832145071",
        "fotos": "foto.com.br",
        "areasInteresse" : list(set([getRandomArea() for _ in range(3)])),
    },
        {
        "name": "Aluno 5",
        "email": "Aluno5@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44)9999-9999",
        "typeUser": "Aluno",
        "cidade": "Mandaguari",
        "uf": "Acre",
        "cpf": "94207098097",
        "fotos": "foto.com.br",
        "areasInteresse" : list(set([getRandomArea() for _ in range(3)])),
    },
]

for mentor in mentores:
    print(f'Cadastrando Mentor {mentor["name"]}')
    tmp = requests.post(url_base + 'mentor', json=mentor)
    print(tmp.json())
    mentor.update({'idUser': tmp.json()['idUser']['_id']})

for user in alunos:
    print(f'Cadastrando Usuário {user["name"]}')
    tmp = requests.post(url_base + 'aluno', json=user)
    print(tmp.json())
    user.update({'idUser': tmp.json()['idUser']['_id']})


response_aluno_renan = requests.post(url_base + 'aluno', json=aluno_renan)
print(response_aluno_renan)
print(response_aluno_renan.json())

response_mentor_men = requests.post(url_base + 'mentor', json=mentor_men)
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
        url=url_base + f'users/{response["_id"]}/update-status',
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
    data={
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
    data={
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
    data={
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
    data={
        'idAluno': response_aluno_renan.json()['_id'],
        'idMentor': res_mentor_men.json()['_id'],
    }, 
    headers=getHeader(token_renan)
)

print(response_chat.json())