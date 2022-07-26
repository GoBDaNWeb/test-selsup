import React, {useState} from 'react'

interface Param {
	id: number;
	name: string;
	type: string;
}
interface ParamValue {
	paramId: number,
	value: string
}

interface Props {
	params: Param[],
	model: ParamValue[]
	setModel: React.Dispatch<React.SetStateAction<ParamValue[]>>
}



const initStateParams = [
	{
		id: 1,
		name: "Назначение",
		type: 'string'
	},
	{
		id: 2,
		name: "Длина",
		type: 'string'
	}
]

const initStateModels = [
	{
		paramId: 1,
		value: "повседневное"
	},
	{
		paramId: 2,
		value: "макси"
	}
]


const ParamEditor: React.FC<Props> = ({params, model, setModel}) => {
	const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>, id: number): void => {
		const {value} = e.target
		setModel(
			model.map(item => 
				item.paramId === id ? {...item, value} : item
			)
		)
	}

	const unit = (id: number): ParamValue[] => {
		return model.filter(item => item.paramId === id)
	}
	return(
		<div>
			{
				params.map(param => (
					<label key={param.id} className='flex gap-2 justify-between w-80 mb-2'>
						<h4>
							{param.name}
						</h4>
						<input
							onChange={(e) => changeValueHandler(e, param.id)}
							className='border-[1px] border-black'
							type={param.type} 
							name={param.name}
							value={unit(param.id)[0].value}
						/>
					</label>
				))
			}
		</div>
	)
}

const App: React.FC = () => {
	const [params, setParams] = useState<Param[]>(initStateParams)
	const [model, setModel] = useState<ParamValue[]>(initStateModels)

	const getModel = () => {
		const structure = {
			params: {...params},
			model: {...model}
		}
		console.log(structure)
	}


	return (
		<div className='flex items-center jusityf-center h-screen w-full '>
			<div className='flex flex-col items-center justify-center w-full'>
				<div>
					<ParamEditor params={params} model={model} setModel={setModel}/>
					<button 
						onClick={getModel}
						className='border-[1px] border-black rounded-full px-4 py-1 hover:bg-black hover:text-white transition'
					>
						Получить Структуру в консоль
					</button>
				</div>
			</div>
		</div>
	)
}

export default App;
