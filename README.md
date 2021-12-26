# Nest JS framework Note

##    Getting Start project
```
sudo npm i -g @nest/cli
nest -v
nest new project_name 
git init
```

##    Thunder client VScode extension for test restAPi
```
Collection
    Request
        Header:
        Body: 
            Auth:
            Session:
ENV:
    Auth
    JWT
    Session
```

##    Project Structure
```
./nest-app
├── dist // 由 tsc 編譯ts專案輸出成js專案
    └── ...
├── node_module // 安裝的外部模組
├── src // ts主要開發資料夾
    ├── app // App RootModule，把所有的SubModule打包成App
        └── app.module.ts // 條列所有需要的元件
    ├── common // 包含可能常會用到的的邏輯，例如middleware，DBConnect，DataSchema etc.
        └── middleware // 所有middleware
            └── ValidStudent.middleware.ts // 驗證傳入的studentId是否存在
    ├── student // SubModule， 包含所有有關"/students"路徑的APi邏輯
        ├── dto // Data To Obj, 將request body傳入的資料轉成物件，方便宣告資料型態跟取用
            └── student.dto.ts // 定義所有的Req/Res Header/Body 屬性與資料型態
        ├── student.service.ts // Provider 將資料處理成Dto規定的型態
        ├── student.controller.ts // Controller 分類所有的Reqest跟Respone，並呼叫Provider取得資料
        └── student.module.ts // 組合成SubModule，提供Root AppModule引用
    ├── teacher // SubModule
        ├── dto // Data To Obj 
        ├── teacher.service.ts
        ├── teacher.controller.ts
        └── teacher.module.t
    ├── main.ts // 主程式，設定伺服器跟端口與運作AppModule  
    └── test // e2e test
├── .gitignore
├── package.json
├── package-look.json
└── tsconfig.json // 設定tsc 編譯的格式與規定
```

## Nest cli Command
###    Create a new Controller
* Flag --no-spec 表示只產生controller檔案與資料夾，不產生測試檔案
    * controller
    ```
    nest g controller __name__ --no-spec
    ```
    * service (Provider)
    ```
    nest g service __SameNameController__ --no-spec
    ```
    * module 
    ```
    nest g module __moduleName__
    ```


##    Request Response

###   @Controller @Get @Post @Put @Patch @Delete
* **@Controller()** 宣告子：宣稱此物件屬於Controller類別，參數可傳入此路徑的根路徑
* **@Get()** ：此方法是處理get request，參數可傳入需要的Param或子路徑
* **@Post()** ：此方法是處理post request，參數同上
* **@Put()** ：此方法是處理put request，參數同上
* **@Patch()** ：此方法是處理patch request，參數同上
* **@Delete()** ：此方法是處理delete request，參數同上
```
./student/student.controller.ts

import { Controller, Get, Post, Put, Param } from '@nestjs/common';

@Controller('students')
export class StudentController {
  @Get()
  getStudents(){return ...}

  @Get('/:studentId')
  getStudentById(){return ...}

  @Post()
  createStudent() {return ...}

  @Put('/:studentId')
  updateStudentById() {return ...}
}

```
###    @Param()
```
@Get('/:studentId') // 使用此API，需要傳入ID
getStudentById(
    // @Param 可以取出所有的req參數， 並被當成一個param類別的物件
    @Param() params: { studentId: string }
    
    // @Param('studentId') 表示只需要物件只需要所有參數中的{'studentId'}物件屬性
    // 也可以重新建構成單一屬性， 例如 studentId
    @Param('studentId') studentId: string
) {
    console.log(params);
    console.log(studentId);
    return 'Get student by id';
}
```

## Service (Provider)
###    @Injectable() 宣告Provider
```
./src/student/student.service.ts
// Provider service
import { Injectable } from '@nestjs/common';

@Injectable() // Mark this class is provider
export class StudentService {
    // Access in DB
    // Query certain data or metadata
    // Transfer data to controller
    
    private Data = Some_Query_To_DB()...
    
    same_to_request_name() {
        return this.data
    }
}


./src/student/student.controller.ts

import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { SomeDto } from '.../*.dto';
import { StudentService } from './student.service'; // Import Provider

@Controller('students')
export class StudentController {

  // init consturctor to retrieve data
  constructor(private readonly studentService: StudentService) {}

  @Get('/:studentId')
  getStudentById(
    @Param('studentId') studentId: string,
  ): SomeDto {
    return this.studentService.getStudents();
  }

}


```

## Module (Separate and Organization component)
* 一個NestApp，至少有一個以上的 Module
* Root Module為app.module.ts
* 不能把所有的Controller或Provider都塞入root AppModule
* 要分隔並重新組織化成一個SubModule，在加入root AppModule
```
./common/middleware/ValidStudent.middleware.ts

// Check this Id is belong to the particular Student
import { 
Injectable, 
NestMiddleware, 
HttpException } from '@nestjs/common';

import { 
Request, 
Response, 
NextFunction } from 'express'; // nest已包含express 可以直接Import

import { students } from '../../db'; // 從DB拿到比對資料

@Injectable() // 標示此類別是可注入的
// 宣告此類別實作了NestMiddleware
export class ValidStudentMiddleware implements NestMiddleware { 
    use(req: Request, res: Response, next: NextFunction) {
        // 驗證邏輯....
    }
    next(); // 傳入下一個Middleware或Controller
  }
}

./student/student.module.ts


import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
// Import Middleware
import { ValidStudentMiddleware } from '../common/middleware/validStudent.middleware'; 
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService], // Because TeacherModule need this Provider
})

// 此模組若要使用Middleware，需要實作NestModule
export class StudentModule implements NestModule {
  // 定義Middleware
  configure(consumer: MiddlewareConsumer) {
    // Get student by id
    consumer.apply(ValidStudentMiddleware).forRoutes({
      path: 'students/:studentId',
      method: RequestMethod.GET,
    });
    // Put student by id
    consumer.apply(ValidStudentMiddleware).forRoutes({
      path: 'students/:studentId',
      method: RequestMethod.PUT,
    });
  }
}

```

##    練習API 
###    API規劃圖
![API規劃圖](https://i.imgur.com/h2U97v3.png)

##    Nest Req/Res workflow
![流程圖](https://i.imgur.com/HgLNdXT.png)
* Client
    * Req
        1. Header Params/ Query/ SessionToken
        2. Body Data
    * Res
        * SessionToken
        * Body Data
* Server
    * Middleware 可以有多個，預處理Req的資料
    * Pipe 驗證資料型態或是資料型態轉化
    * Controller 負責區分不同Method Req，使用Provider取得資料
    * Provider 依照自定Dto的資料物件規則，取得與回傳資料


