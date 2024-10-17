import requests

url_base = 'http://localhost:3000/'

aluno_renan = {
    "name":"Renan Rocha",
    "email": "renan@gmail.com",
    "senha": "Teste123!",
    "telefone": "(44)9999-9999",
    "typeUser": "Aluno",
    "cidade": "Mandaguari",
    "uf": "Acre",
    "cpf": "11550847996",
    "fotos": "https://avatars.githubusercontent.com/u/77353839?v=4"
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
}

mentores = [
    {
        "name": "Mentor 1",
        "email": "Mentor1@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44)9999-9999",
        "typeUser": "Mentor",
        "cidade": "Mandaguari",
        "uf": "Acre",
        "cpf": "46237522085",
        "fotos": "https://img.freepik.com/fotos-gratis/pessoa-de-origem-indiana-se-divertindo_23-2150285283.jpg?ga=GA1.1.627376283.1729164402&semt=ais_hybrid",
    },
        {
        "name": "Mentor 2",
        "email": "Mentor2@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44)9999-9999",
        "typeUser": "Mentor",
        "cidade": "Mandaguari",
        "uf": "Acre",
        "cpf": "68163716070",
        "fotos": "foto.com.br",
    },
        {
        "name": "Mentor 3",
        "email": "Mentor3@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44)9999-9999",
        "typeUser": "Mentor",
        "cidade": "Mandaguari",
        "uf": "Acre",
        "cpf": "43193278025",
        "fotos": "foto.com.br",
    },
        {
        "name": "Mentor 4",
        "email": "Mentor4@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44)9999-9999",
        "typeUser": "Mentor",
        "cidade": "Mandaguari",
        "uf": "Acre",
        "cpf": "77482899057",
        "fotos": "foto.com.br",
    },
        {
        "name": "Mentor 5",
        "email": "Mentor5@gmail.com",
        "senha": "Teste123!",
        "telefone": "(44)9999-9999",
        "typeUser": "Mentor",
        "cidade": "Mandaguari",
        "uf": "Acre",
        "cpf": "84825754066",
        "fotos": "foto.com.br",
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
    },
]

for user in mentores + alunos:
    print(f'Cadastrando Usuário {user["name"]}')
    tmp = requests.post(url_base + 'users', data=user)
    print(tmp.json())
    user.update({'_id': tmp.json()['_id']})


response_aluno_renan = requests.post(url_base + 'users', data=aluno_renan)
print(response_aluno_renan)
print(response_aluno_renan.content)

response_mentor_men = requests.post(url_base + 'users', data=mentor_men)
print(response_mentor_men)
print(response_mentor_men.content)

response_admin_prisco = requests.post(url_base + 'users', data=admin_prisco)
print(response_admin_prisco)
print(response_admin_prisco.content)

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
print(response_mentoria2.json())


cards_mentorias = requests.get(
    url_base + 'mentorias/cards', 
    headers=getHeader(token_renan)
)

cards_mentorias.json()

