let toTestButton = document.querySelector(".toTestButton");
let toInsertButton = document.querySelector(".toInsertButton");
let test = document.querySelector(".test");
let insert = document.querySelector(".insert");
let testContent = document.querySelector(".test-content");
let insertContent = document.querySelector(".insert-content");

let Nsymptoms = 16;
let Nillnes = 4;

let symptoms = [
    "Общее недомогание", 
    "Сухость, першение", 
    "Кашель сначала сухой, затем мокрый", 
    "Голос хриплый или беззвучный", 
    "Иногда боль при глотании", 
    "Головная боль", 
    "Повышенная температура тела", 
    "Быстрая утомляемость гортани", 
    "Периодический кашель с мокротой", 
    "Охриплость с афонией", 
    "Ощущение дискомфорта в гортани", 
    "Жжение в горле", 
    "Кашель при обострении", 
    "Сухой кашель", 
    "Слизистая покрыта густой слизью", 
    "Откашливание с прожилками крови"
];

let illnes = [
    "Ларингит острый",
    "Ларингит хронический катаральный",
    "Ларингит хронический гипертрофический",
    "Ларингит хронический атрофический"
];

let diagnoses = [
    [1, 1, 1, 1],
    [1, 1, 0, 1],
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
];

let MeraDoveriya = [
    [0.25, 0.26, 0.24, 0.23],
    [0.30, 0.31, 0.00, 0.29],
    [0.45, 0.00, 0.00, 0.00],
    [0.30, 0.32, 0.00, 0.31],
    [0.46, 0.00, 0.00, 0.00],
    [0.45, 0.00, 0.00, 0.00],
    [0.44, 0.00, 0.00, 0.00],
    [0.00, 0.43, 0.00, 0.00],
    [0.00, 0.42, 0.00, 0.00],
    [0.00, 0.00, 0.45, 0.00],
    [0.00, 0.00, 0.46, 0.00],
    [0.00, 0.00, 0.44, 0.00],
    [0.00, 0.00, 0.47, 0.00],
    [0.00, 0.00, 0.00, 0.47],
    [0.00, 0.00, 0.00, 0.42],
    [0.00, 0.00, 0.00, 0.43]
];

let MeraNeDoveriya = [
    [0.0099, 0.0098, 0.0097, 0.0100],
    [0.0095, 0.0085, 0.0000, 0.0081],
    [0.0010, 0.0000, 0.0000, 0.0000],
    [0.0100, 0.0093, 0.0000, 0.0094],
    [0.0010, 0.0000, 0.0000, 0.0000],
    [0.0009, 0.0000, 0.0000, 0.0000],
    [0.0008, 0.0000, 0.0000, 0.0000],
    [0.0000, 0.0011, 0.0000, 0.0000],
    [0.0000, 0.0012, 0.0000, 0.0000],
    [0.0000, 0.0000, 0.0011, 0.0000],
    [0.0000, 0.0000, 0.0009, 0.0000],
    [0.0000, 0.0000, 0.0008, 0.0000],
    [0.0000, 0.0000, 0.0010, 0.0000],
    [0.0000, 0.0000, 0.0000, 0.0009],
    [0.0000, 0.0000, 0.0000, 0.0012],
    [0.0000, 0.0000, 0.0000, 0.0011]
];

// function chnageMD_MND()
// {
//     for(let i = 0; i < Nillnes; i++)
//     {
//         let kolSympt = 0;
//         diagnoses[i].map((symp) => {
//             kolSympt = (sympt == 1) ? kolSympt++ : kolSympt;
//         });

//         switch(kolSympt)
//         {
//             case 0:
//                 MeraDoveriya[i] = 0;
//                 MeraNeDoveriya[i] = 0;
//                 break;
//             case 1:
//                 MeraDoveriya[i] = 0.45;
//                 MeraNeDoveriya[i] = 0.1;
//                 break;
//             case 2:
//                 MeraDoveriya[i] = 0.4;
//                 MeraNeDoveriya[i] = 0.1;
//                 break;
//             case 3: 
//                 MeraDoveriya[i] = 0.3;
//                 MeraNeDoveriya[i] = 0.01;
//                 break;
//             default:
//                 MeraDoveriya[i] = 0.25;
//                 MeraNeDoveriya[i] = 0.01;
//                 break;
//         }
//     }
// }

InitTest();

toTestButton.onclick = function()
{
    toTest();
}

function toTest()
{
    test.style = "display: ;";
    insert.style = "display: none;";
    InitTest();
}

toInsertButton.onclick = function()
{
    toInsert();
}

function toInsert()
{
    test.style = "display: none;";
    insert.style = "display: ;";
    InitInsert()
}

function InitInsert()
{
    insertContent.innerHTML = `            <button class="insert-symptom">Добавить симптом</button>
    <button class="insert-illnes">Добавить болезнь</button>
    <button class="correct-illnes">Изменить болезнь</button>`;

    let insertSymptomBut = document.querySelector(".insert-symptom");
    let insertIllnesBut = document.querySelector(".insert-illnes");
    let correctSymptomBut = document.querySelector(".correct-illnes");
    
    insertSymptomBut.onclick = function(){InitInsertSymptom()};
    insertIllnesBut.onclick = function(){InitInsertIllnes(0, [])};
    correctSymptomBut.onclick = function(){InitCorrectIllnes()};
}

function InitCorrectIllnes()
{
    insertContent.innerHTML = " ";
    for(let i = 0; i < Nillnes; i++)
    {
        let btn = `<button class="illnes${i}" onclick = "InitCorrectIllnesIterable(0, [], ${i})">${illnes[i]}</button>`;
        insertContent.innerHTML += btn;
    }
}

function InitCorrectIllnesIterable(iterator, ansver, iIllnes)
{
    insertContent.innerHTML = `<div class="question">Эта болезнь характеризуется этим симптомом: "${symptoms[iterator]}"?</div>
        <div class="ansver">
            <button class="yes">Да</button>
            <button class="no">Нет</button>
        </div>`;
    let buttonYes = document.querySelector(".yes");
    let buttonNo = document.querySelector(".no");

    buttonYes.onclick = function (){
        ansver.push(1);
        iterator++;

        if(iterator < Nsymptoms) InitCorrectIllnesIterable(iterator, ansver, iIllnes);
        else CorrectCheck(ansver, iIllnes);
    }

    buttonNo.onclick = function (){
        ansver.push(0);
        iterator++;

        if(iterator < Nsymptoms) InitCorrectIllnesIterable(iterator, ansver, iIllnes);
        else CorrectCheck(ansver, iIllnes);
    }
}

function CorrectCheck(ansver, iIllnes)
{
    for(let i = 0; i < Nillnes; i++)
    {
        let Nsymptoms1 = 0;
        let Nsymptoms2 = 0;
        let equals = 0;

        for(let j = 0; j < Nsymptoms; j++)
        {
            if(i != iIllnes){
                Nsymptoms1 = (ansver[j] === 1) ? Nsymptoms1 + 1 : Nsymptoms1;
                Nsymptoms2 = (diagnoses[i][j] === 1) ? Nsymptoms2 + 1 : Nsymptoms2;
                equals = (ansver[j] === diagnoses[i][j] && diagnoses[i][j] === 1 && ansver[j] === 1) ? equals + 1 : equals;
            }
        }

        if((Nsymptoms1 > Nsymptoms2 && Nsymptoms2 === equals)   || 
        (Nsymptoms2 > Nsymptoms1 && Nsymptoms1 === equals)      || 
        (Nsymptoms1 === Nsymptoms2 && Nsymptoms1 === equals))
        {
            WrongCorrectError();
            return 0;
        }
    }
    CompleteCorrectIllnes(ansver, iIllnes);
}

function WrongCorrectError()
{
    insertContent.innerHTML = `<p>Данная болезнь не соответствует условию (возможно она является вхождением другой болезни).</p>
    <button class = "backToInsert">Попробовать снова</button>`
    let button1 = document.querySelector(".backToInsert");
    button1.onclick = function(){InitInsertIllnes(0, [])};
}

function CompCorrectIllnes(ansver, iIllnes)
{
    insertContent.innerHTML = `            <p>Введите название болезни</p>
    <input type="text" class = "illnes-name">
    <button class="submit-illnes">Добавить болезнь</button>`;

    let inputIllnesName = document.querySelector(".illnes-name");
    let inputSubmitButton = document.querySelector(".submit-illnes");

    inputSubmitButton.onclick = function(){
        Nillnes++;
        illnes[iIllnes] = inputIllnesName.value;
        for(let i = 0; i < Nsymptoms; i++)
        {
            diagnoses[i][iIllnes] = ansver[i];
            for(let j = 0; j < diagnoses[0].length; j++)
            {
                MeraDoveriya[i][iIllnes] = (MeraDoveriya[i][j] > 0.000001) ? MeraDoveriya[i][j] : 0;
                MeraNeDoveriya[i][iIllnes] = (MeraNeDoveriya[i][j] > 0.000001) ? MeraNeDoveriya[i][j] : 0;
            }

        }
        toInsert();
    };
    //chnageMD_MND();
}

function InitInsertSymptom()
{
    insertContent.innerHTML = `<p>Введите название симптома</p>
    <input class = "input-symptom" type="text">
    <button class="apply-insert-symptom">Добавить симптом</button>`;

    let inputSymptom = document.querySelector(".input-symptom");
    let applyInserSymptom = document.querySelector(".apply-insert-symptom");

    applyInserSymptom.onclick = function(){
        symptoms.push(inputSymptom.value);
        Nsymptoms++;
        let newsymptom = [];
        for(let i = 0; i < Nillnes; i++)
        {
            newsymptom.push(0);
        }
        diagnoses.push(newsymptom);
        InitInsert();
    }
}


function InitInsertIllnes(iterator, ansver)
{
    insertContent.innerHTML = `<div class="question">Эта болезнь характеризуется этим симптомом: "${symptoms[iterator]}"?</div>
        <div class="ansver">
            <button class="yes">Да</button>
            <button class="no">Нет</button>
        </div>`;
    let buttonYes = document.querySelector(".yes");
    let buttonNo = document.querySelector(".no");

    buttonYes.onclick = function (){
        ansver.push(1);
        iterator++;

        if(iterator < Nsymptoms) InitInsertIllnes(iterator, ansver);
        else InsertCheck(ansver);
    }

    buttonNo.onclick = function (){
        ansver.push(0);
        iterator++;

        if(iterator < Nsymptoms) InitInsertIllnes(iterator, ansver);
        else InsertCheck(ansver);
    }
}

function InsertCheck(ansver)
{
    for(let i = 0; i < Nillnes; i++)
    {
        let Nsymptoms1 = 0;
        let Nsymptoms2 = 0;
        let equals = 0;

        for(let j = 0; j < Nsymptoms; j++)
        {
            Nsymptoms1 = (ansver[j] === 1) ? Nsymptoms1 + 1 : Nsymptoms1;
            Nsymptoms2 = (diagnoses[i][j] === 1) ? Nsymptoms2 + 1 : Nsymptoms2;
            equals = (ansver[j] === diagnoses[i][j] && diagnoses[i][j] === 1 && ansver[j] === 1) ? equals + 1 : equals;
        }

        if((Nsymptoms1 > Nsymptoms2 && Nsymptoms2 === equals) || (Nsymptoms2 > Nsymptoms1 && Nsymptoms1 === equals) || (Nsymptoms1 === Nsymptoms2 && Nsymptoms1 === equals))
        {
            WrongInsertError();
            return 0;
        }
    }
    CompleteInsertIllnes(ansver);
}

function WrongInsertError()
{
    insertContent.innerHTML = `<p>Данная болезнь не соответствует условию (возможно она является вхождением другой болезни).</p>
    <button class = "backToInsert">Попробовать снова</button>`
    let button1 = document.querySelector(".backToInsert");
    button1.onclick = function(){InitInsertIllnes(0, [])};
}

function CompleteInsertIllnes(ansver)
{
    insertContent.innerHTML = `            <p>Введите название болезни</p>
    <input type="text" class = "illnes-name">
    <button class="submit-illnes">Добавить болезнь</button>`;

    let inputIllnesName = document.querySelector(".illnes-name");
    let inputSubmitButton = document.querySelector(".submit-illnes");

    inputSubmitButton.onclick = function(){
        Nillnes++;
        illnes.push(inputIllnesName.value);
        for(let i = 0; i < Nsymptoms; i++)
        {
            diagnoses[i].push(ansver[i]);
            for(let j = 0; j < diagnoses[0].length; j++)
            {
                MeraDoveriya[i][iIllnes] = (MeraDoveriya[i][j] > 0.000001) ? MeraDoveriya[i][j] : 0;
                MeraNeDoveriya[i][iIllnes] = (MeraNeDoveriya[i][j] > 0.000001) ? MeraNeDoveriya[i][j] : 0;
            }
        }
        toInsert();
    };
    //chnageMD_MND();
}

function InitTest()
{
    testContent.innerHTML = `<button class = "init-test">Начать тест</button>`;
    let initTestButton = document.querySelector(".init-test");
    let iterator = 0;
    let ansver = [];
    let curentMD = [];
    let curentMND = [];
    diagnoses[0].map(() => {
        curentMD.push(0);
        curentMND.push(0);
        return;
    });
    initTestButton.onclick = function () {revealTestIterable(iterator, ansver, curentMD, curentMND);};
}

function revealTestIterable(iterator, ansver, curentMD, curentMND)
{
    testContent.innerHTML = `<div class="question">У вас присутствует "${symptoms[iterator]}"?</div>
        <div class="ansver">
            <button class="yes">Да</button>
            <button class="no">Нет</button>
        </div>`;
    let buttonYes = document.querySelector(".yes");
    let buttonNo = document.querySelector(".no");

    buttonYes.onclick = function (){
        ansver.push(1);
        for(let i = 0; i < curentMD.length; i++)
        {
            if(diagnoses[iterator][i] == 1)
            {
                curentMD[i] = curentMD[i] + MeraDoveriya[iterator][i] * (1 - curentMD[i]);
                curentMND[i] = curentMND[i] + MeraNeDoveriya[iterator][i] * (1 - curentMND[i]);
            }
        }
        iterator++;
        if(iterator < Nsymptoms) revealTestIterable(iterator, ansver, curentMD, curentMND);
        else showAnsver(ansver, curentMD, curentMND);
    }

    buttonNo.onclick = function (){
        ansver.push(0);

        iterator++;
        if(iterator < Nsymptoms) revealTestIterable(iterator, ansver, curentMD, curentMND);
        else showAnsver(ansver, curentMD, curentMND);
    }
}

function showAnsver(ansver, curentMD, curentMND)
{
    let KoefUverennosti = [];
    for(let i = 0; i < diagnoses[0].length; i++)
    {
        KoefUverennosti.push(curentMD[i] - curentMND[i]);
    }

    testContent.innerHTML = `<table class = "tableansver">
    <tr>
        <th>Название болезни</th>
        <th>Мера доверия</th>
        <th>Мера недоверия</th>
        <th>Коэффициент уверенности</th>
    </tr>
</table>`;

    let table = document.querySelector(".tableansver");
    for(let i = 0; i < diagnoses[0].length; i++)
    {
        
        let text = `<tr>
        <th>${illnes[i]}</th>
        <th>${curentMD[i].toFixed(4)}</th>
        <th>${curentMND[i].toFixed(4)}</th>
        <th>${KoefUverennosti[i].toFixed(4)}</th>
    </tr>`;
        table.innerHTML+=text;
    }

    testContent.innerHTML += `<button class="torealansver">Перейти к ответу</button>`

    let toRealAnsverButton = document.querySelector(".torealansver");
    toRealAnsverButton.onclick = () => {
        toRealAnsver(curentMD, curentMND, KoefUverennosti);
    }

}

function toRealAnsver(curentMD, curentMND, KoefUverennosti)
{
    
    testContent.innerHTML = `<table class = "tableansver">
    <tr>
        <th>Название болезни</th>
        <th>Мера доверия</th>
        <th>Мера недоверия</th>
        <th>Коэффициент уверенности</th>
    </tr>
</table>`;

    let poryadoc = [];
    for(let i = 0; i < diagnoses[0].length; i++)
    {
        poryadoc.push(i);
    }

    for(let i = 0; i < diagnoses[0].length; i++)
    {
        for(let j = 0; j < diagnoses[0].length - 1; j++)
        {
            if(KoefUverennosti[poryadoc[j]] < KoefUverennosti[poryadoc[j+1]])
            {
                [poryadoc[j], poryadoc[j+1]] = [poryadoc[j+1],poryadoc[j]];
            }
        }
    }

    

    let table = document.querySelector(".tableansver");
    for(let i = 0; i < diagnoses[0].length; i++)
    {
        if(KoefUverennosti[poryadoc[i]] < 0.5) continue;
        let text = `<tr>
        <th>${illnes[poryadoc[i]]}</th>
        <th>${curentMD[poryadoc[i]].toFixed(4)}</th>
        <th>${curentMND[poryadoc[i]].toFixed(4)}</th>
        <th>${KoefUverennosti[poryadoc[i]].toFixed(4)}</th>
    </tr>`;
        table.innerHTML+=text;
    }

    testContent.innerHTML += `<button class="toTest">Пройти тест снова</button>`

    let toTestButton = document.querySelector(".toTest");
    toTestButton.onclick = () => {
        InitTest();
    }
}