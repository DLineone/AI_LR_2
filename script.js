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
    console.log(iIllnes);
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

        if((Nsymptoms1 > Nsymptoms2 && Nsymptoms2 === equals) || (Nsymptoms2 > Nsymptoms1 && Nsymptoms1 === equals) || (Nsymptoms1 === Nsymptoms2 && Nsymptoms1 === equals))
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
        }
        toInsert();
    };
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
        }
        toInsert();
    };
    
}

function InitTest()
{
    testContent.innerHTML = `<button class = "init-test">Начать тест</button>`;
    let initTestButton = document.querySelector(".init-test");
    let iterator = 0;
    let ansver = [];
    initTestButton.onclick = function () {revealTestIterable(iterator, ansver);};
}

function revealTestIterable(iterator, ansver)
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
        iterator++;

        if(iterator < Nsymptoms) revealTestIterable(iterator, ansver);
        else showAnsver(ansver);
    }

    buttonNo.onclick = function (){
        ansver.push(0);
        iterator++;

        if(iterator < Nsymptoms) revealTestIterable(iterator, ansver);
        else showAnsver(ansver);
    }
}

function showAnsver(ansver)
{
    let nIlnes = -1;
    let compareAnsver = [];
    for(let i = 0; i < Nillnes; i++)
    {
        compareAnsver = [];
        for(let j = 0; j < Nsymptoms; j++)
        {
            compareAnsver.push(diagnoses[j][i]);
        }

        if(compareAnsver.join() === ansver.join())
        {
            nIlnes = i;
            break;
        }
    }

    if(nIlnes >= 0)
    {
        testContent.innerHTML = `<p style = " text-align: center">Ваше заболевание "${illnes[nIlnes]}"! <br>Поздравляем!</p>`;
    }
    else
    {
        testContent.innerHTML = `<p style = " text-align: center">Такого заборевания нету( <br>Может хотите его описать?</p>
            <button class="toInsertButtonAns">Заполнение базы знаний</button>
            <button class="toTestButtonAns">Пройти тест ещё раз</button>`;
        let toInsertButtonAns = document.querySelector(".toInsertButtonAns");
        toInsertButtonAns.onclick = function () {toInsert()};

        let toTestButtonAns = document.querySelector(".toTestButtonAns");
        toTestButtonAns.onclick = function () {toTest()};
    }
}