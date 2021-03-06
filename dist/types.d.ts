import { Event, Store, Domain } from "effector";
declare type InitFieldValue<Value> = () => Value;
export declare type ValidationEvent = "submit" | "blur" | "change";
export declare type ValidationResult = {
    isValid: boolean;
    errorText?: string;
};
export declare type Validator<Value, Form = any, Source = any> = (value: Value, form?: Form, source?: Source) => boolean | ValidationResult;
export declare type ValidationError<Value = any> = {
    rule: string;
    value: Value;
    errorText?: string;
};
export declare type Rule<Value, Form = any, Source = any> = {
    name: string;
    errorText?: string;
    source?: Store<Source>;
    validator: Validator<Value, Form, Source>;
};
export declare type FieldData<Value> = {
    value: Value;
    errors: ValidationError<Value>[];
    firstError: ValidationError<Value> | null;
    isValid: boolean;
    isDirty: boolean;
    isTouched: boolean;
};
export declare type Field<Value> = {
    name: string;
    $value: Store<Value>;
    $errors: Store<ValidationError<Value>[]>;
    $firstError: Store<ValidationError<Value> | null>;
    $isValid: Store<boolean>;
    $isDirty: Store<boolean>;
    $isTouched: Store<boolean>;
    $touched: Store<boolean>;
    $field: Store<FieldData<Value>>;
    onChange: Event<Value>;
    changed: Event<Value>;
    onBlur: Event<void>;
    addError: Event<{
        rule: string;
        errorText?: string;
    }>;
    validate: Event<void>;
    reset: Event<void>;
    set: Event<Value>;
    resetErrors: Event<void>;
    resetValue: Event<void>;
    filter?: Store<boolean> | FilterFunc<Value>;
};
declare type FilterFunc<Value> = (value: Value) => boolean;
export declare type RuleResolver<Value = any, Form = any> = (value: Value, form: Form) => Rule<Value, Form, void>[];
export declare type FieldConfig<Value> = {
    init: Value | InitFieldValue<Value>;
    rules?: Rule<Value>[] | RuleResolver<Value, any>;
    filter?: Store<boolean> | FilterFunc<Value>;
    validateOn?: ValidationEvent[];
    units?: {
        $value?: Store<Value>;
        $errors?: Store<ValidationError<Value>[]>;
        $isTouched?: Store<boolean>;
        onChange?: Event<Value>;
        changed?: Event<Value>;
        onBlur?: Event<void>;
        addError?: Event<{
            rule: string;
            errorText?: string;
        }>;
        validate?: Event<void>;
        resetValue?: Event<void>;
        reset?: Event<void>;
        resetErrors?: Event<void>;
    };
};
export declare type AnyFields = {
    [key: string]: Field<any>;
};
export declare type AnyFieldsConfigs = {
    [key: string]: FieldConfig<any>;
};
export declare type AnyFormValues = {
    [key: string]: any;
};
export declare type FormValues<Fields extends AnyFieldsConfigs> = {
    [K in keyof Fields]: Fields[K] extends FieldConfig<infer U> ? U : never;
};
export declare type FormConfig<Fields extends AnyFieldsConfigs> = {
    fields: Fields;
    domain?: Domain;
    filter?: Store<boolean>;
    validateOn?: ValidationEvent[];
    units?: {
        submit?: Event<void>;
        validate?: Event<void>;
        reset?: Event<void>;
        resetValues?: Event<void>;
        resetTouched?: Event<void>;
        resetErrors?: Event<void>;
        formValidated?: Event<FormValues<Fields>>;
        setForm?: Event<Partial<FormValues<Fields>>>;
    };
};
export {};
