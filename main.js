const btns = document.querySelectorAll('button')
const addItem = document.querySelector('.input')

function todoList(btns) {
    Array.from(btns).forEach((btn) => {
        btn.onclick = (e) => {
            
            //todo: Giá trị trả về khi nhấp vào đâu đó
            const keys = e.target
            const action = keys.dataset.action
            const key = keys.parentElement.parentElement
            const actived = key.dataset.active
            
            //todo: Xử lý khi click DONE
            if(action === 'done') {
                const listContent = key.querySelector('.list-content')
                if(actived !== 'EDIT') {
                    if(actived !== 'DONE') {
                        key.dataset.active = 'DONE'
                        listContent.style.textDecoration = 'line-through'
                    }
                    else {
                        key.dataset.active = ''
                        listContent.style.textDecoration = ''
                    }
                }
            }

            //todo: Xử lý khi click DELETE
            if(action === 'delete') {
                key.remove()
            }

            //todo: Xử lý khi click CLEAR (xóa từng item 1)
            if(action === 'clear') {
                const items = document.querySelectorAll('.item')
                Array.from(items).map(item => {
                    item.remove()
                })
            }

            //todo: Xử lý khi click EDIT
            if(action === 'edit') {
                const editContent = key.querySelector('.list-content')

                if(actived !== 'DONE') {
                    if(actived !== 'EDIT') {
                        key.dataset.active = 'EDIT'
                        editContent.innerHTML = `
                            <input type="text" name="" id="edit-value" value="${editContent.innerHTML.trim()}">
                            <button class="ok">OK</button>
                        `
                    }
        
                    const editValue = editContent.querySelector('#edit-value')
                    const btnOk = editContent.querySelector('.ok')
                    
                    btnOk.onclick = () => {
                        key.dataset.active = ''
                        editContent.innerHTML = editValue.value
                    }
                }
            }

            //todo: Xử lý khi click ADD
            if(action === 'add') {
                if(addItem.value !== '') {
                    const listItem = document.querySelector('.list-item')
                    const items = listItem.querySelectorAll('.item')
                    const arr = Array.from(items)

                    //todo: Khởi tạo todoList mới
                    const htmls = `
                        <div class="item item-${arr.length}">
                            <div class="list-content">
                                ${addItem.value}
                            </div>
                            
                            <div class="btn-action">
                                <button data-action="done">Done</button>
                                <button data-action="edit">Edit</button>
                                <button data-action="delete">Delete</button>
                            </div>
                        </div> 
                    `

                    //todo: Render lại todoList cũ
                    const newArr = arr.map((item, index) => {
                        const xxx = item.querySelector('.list-content').textContent.trim()
                        return `
                            <div class="item item-${index}">
                                <div class="list-content">
                                    ${xxx}
                                </div>
                                
                                <div class="btn-action">
                                    <button data-action="done">Done</button>
                                    <button data-action="edit">Edit</button>
                                    <button data-action="delete">Delete</button>
                                </div>
                            </div> 
                        `
                    })

                    addItem.value = ''      //! Sau khi input sẽ trả về string rỗng
                    listItem.innerHTML = htmls + newArr.join('')     //! todoList cũ + todoList thêm vào

                    //todo: Khởi tạo lại (để các action được hoạt động trở lại)
                    const btns = document.querySelectorAll('button')
                    todoList(btns)
                }
            }
        }
    })
}

todoList(btns)