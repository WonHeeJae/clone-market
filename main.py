from fastapi import FastAPI,UploadFile,Form,Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import sqlite3

con = sqlite3.connect('db.db',check_same_thread=False)
cur = con.cursor()

app = FastAPI()


@app.post('/items')
async def create_item(image:UploadFile, 
                title:Annotated[str,Form()], 
                price:Annotated[int,Form()], 
                description:Annotated[str,Form()], 
                place:Annotated[str,Form()],
                insertAt:Annotated[int,Form()]):
    
    image_bytes = await image.read() #이미지를 읽어드림(시간이 걸려서 await을 사용)
    
    cur.execute(f"""
                INSERT INTO items(title, image, price, description, place, insertAt)
                VALUES ('{title}','{image_bytes.hex()}','{price}','{description}','{place}',{insertAt})
                """) #자바스크립트의 `${}` 같은 기능
    con.commit()
    return '200'
    

@app.get('/items')
async def get_items():
    con.row_factory = sqlite3.Row #데이터 조회해서 가져올 때 컬럼명도 같이 가져오게 해줌.
    #ex) 결과 [['id',1],['title','식칼팝니다'],etc...]
    cur = con.cursor()
    rows = cur.execute(f"""
                        SELECT * FROM items;
                      """).fetchall() #가져오는 sql
     
    return JSONResponse(jsonable_encoder(dict(row) for row in rows))
    #가져온 rows를 돌면서 row에 객체형식으로 담아줌)
    #jsonable_encoder : json 형식으로 인코딩해줌
    
@app.get('/images/{item_id}')
async def get_image(item_id):
    cur = con.cursor()
    image_bytes = cur.execute(f"""
                              SELECT image FROM items WHERE id={item_id}
                             """).fetchone()[0] #16진법 상태로 데이터 가져옴
    return Response(content=bytes.fromhex(image_bytes)) #16진법으로 되어있는 이미지를 가져와서 바이트 형식으로 변환시켜서 반환
    
    

app.mount("/",StaticFiles(directory="frontend",html=True),name="frontend")