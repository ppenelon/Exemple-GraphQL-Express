## Introduction
Ce dépôt sert d'exemple d'implémentation basique de GraphQL via Express.   

Dépendances :   
- `graphql` : Module qui permet de rédiger des schémas GraphQL et de les exécuter.
- `express` : Module qui permet de créer l'application Web accessible via HTTP.
- `express-graphql` : Middleware Express qui permet de lire et de traiter les requêtes GraphQL avec un schéma défini.

## Exemple de requête client
**Retourne tous les livres avec leur titre et le nom de leur auteur**
```

query {
    book{
        title
        author{
            name
        }
    }
}
```
**Retourne tous les auteurs avec leur id, leur nom et le titre de leurs livres**
```
query {
    author{
        id
        name
        books{
            title
        }
    }
}
```
**Retourne l'auteur d'ID 2 avec son nom et le titre de ses livres**
```
query {
    author(id: 2){
        name
        books{
            title
        }
    }
}
```
**Crée un livre nommé 'La revanche des Colosses' attribué à l'auteur d'ID 2, renvoie le titre du livre, son auteur avec son nom et le nom de ses livres**
```
mutation {
    createBook(title: "La revanche des Colosses", authorId: 2){
        title
        author{
            name
            books{
                title
            }
        }
    }
}
```

## À savoir

- La classe `GraphQLID` traduit en `string` et non en `number`.
- Vulnérabilité possible avec les relations imbriquées.
- Il n'est pas possible de retourner une instance d'un modèle (comme Auteur) ou un tableau d'instances dans la même requête. En effet, le type (Object ou Array<Object>) est défini dans le schéma et ne peut pas être multiple.   
  Une alternative consiste à créer une requête *Author* (qui prendrait l'ID en argument) et une requête *Authors*, qui retourneraient respectivement l'instance d'un modèle Auteur et un tableau d'instances du modèle Auteur.