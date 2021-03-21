/**
 * 原生js增强
 * @author Heanes
 * @time 2021-02-18 11:34:29 周四
 */

/**
 * 表单工具
 * @param param
 * @param options
 * @author Heanes
 * @time 2021-02-18 11:34:29 周四
 */
function makeForm(param, options) {
    // 检查options并设置默认值
    if(!options.method){
        options.method = 'POST'
    }
    // 创建一个 form
    const form = document.createElement('form')
    if(options.id){
        form.id = options.id
    }
    if(options.name){
        form.name = options.name
    }

    // 添加到 body 中
    document.body.appendChild(form)

    // 创建一个输入
    for (const paramKey in param) {
        if (!Object.hasOwnProperty.call(param, paramKey)) {
            continue
        }
        const input = document.createElement('input')
        input.type = 'text'
        input.name = paramKey
        input.value = param[paramKey]
        // 将该输入框插入到 form 中
        form.appendChild(input)
    }

    // form 的提交方式
    form.method = options.method
    // form 提交路径
    form.action = options.url

    // 对该 form 执行提交
    form.submit()
    // 删除该 form
    document.body.removeChild(form)
}

let param = {
    userErp: 'fanggang7',
    belongOrg: '',
    belongSite: 878088,
    statisticsUnitType: 1,
    statisticsPeriod: 1,
    statisticsUserErp: '',
    statisticsTimeStartStr: '2021-02-09 00:00:00',
    statisticsTimeEndStr: '2021-02-14 00:00:00'
}

makeForm(param, {url: '/center/sortingPerformanceStatistics/export'})