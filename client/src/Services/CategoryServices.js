export default {
    getCategories: () => {
        return fetch('/user/categories')
                .then(res => {
                    if (res.status !== 401) 
                        return res.json().then(data => data);
                    else 
                        return {message: {msgBody: "Unauthorized"}, msgError: true}
                });
    },
    postCategory: category => {
        return fetch('/user/category', {
            method: "post",
            body: JSON.stringify(category),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status !== 401) 
                return res.json().then(data => data);
            else 
                return {message: {msgBody: "Unauthorized"}, msgError: true}
        });
    },
    getTodos: index => {
        return fetch(`/user/todos?id=${index}`, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        }).then(res => {
            if (res.status !== 401) 
                return res.json().then(data => data);
            else 
                return {message: {msgBody: "Unauthorized"}, msgError: true}
        });       
    },
    postTodo: todo => {
        return fetch('/user/todo', {
            method: "post",
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 401)
                return res.json().then(data => data);
            else 
                return {message: {msgBody: "Unauthorized"}, msgError: true}
        })
          
    },
}